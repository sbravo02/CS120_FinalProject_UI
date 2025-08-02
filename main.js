// Frontend logic + small UX enhancements
const form = document.getElementById('reminderForm');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const refreshBtn = document.getElementById('refreshBtn');
const tbody = document.getElementById('remindersTbody');

const ENDPOINTS = {
  list: 'list_reminders.php',
  create: 'create_reminder.php',
  update: 'update_reminder.php',
  delete: 'delete_reminder.php'
};

// Reveal on scroll animation
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

function combineDateTime(dateStr, timeStr) {
  return new Date(`${dateStr}T${timeStr}:00`);
}

function clearErrors() {
  ['title','date','time','message'].forEach(id => {
    const err = document.getElementById(`err_${id}`);
    if (err) err.textContent = '';
  });
}

function validateForm() {
  clearErrors();
  let ok = true;
  const title = document.getElementById('title').value.trim();
  const message = document.getElementById('message').value.trim();
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  if (!title) { document.getElementById('err_title').textContent = 'Title is required.'; ok = false; }
  if (!message) { document.getElementById('err_message').textContent = 'Message is required.'; ok = false; }
  if (!date) { document.getElementById('err_date').textContent = 'Date is required.'; ok = false; }
  if (!time) { document.getElementById('err_time').textContent = 'Time is required.'; ok = false; }

  if (date && time) {
    const dt = combineDateTime(date, time);
    const now = new Date();
    if (dt < now) {
      document.getElementById('err_time').textContent = 'Choose a future time.';
      ok = false;
    }
  }
  return ok;
}

function renderRows(reminders) {
  tbody.innerHTML = '';
  if (!reminders || reminders.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 5;
    td.className = 'muted';
    td.textContent = 'No reminders yet.';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }
  reminders.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.title ?? ''}</td>
      <td>${r.scheduled_at ?? ''}</td>
      <td>${r.frequency ?? 'once'}</td>
      <td>${r.status ?? 'pending'}</td>
      <td>
        <button class="btn secondary" data-action="edit" data-id="${r.id}">Edit</button>
        <button class="btn" data-action="delete" data-id="${r.id}">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function loadReminders() {
  try {
    const res = await fetch(ENDPOINTS.list);
    const data = await res.json();
    renderRows(data.reminders || []);
  } catch (e) {
    console.error(e);
    renderRows([]);
  }
}

function resetFormView() {
  form.reset();
  document.getElementById('reminder_id').value = '';
  submitBtn.textContent = 'Create Reminder';
}

tbody.addEventListener('click', async (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const id = btn.getAttribute('data-id');
  const action = btn.getAttribute('data-action');

  if (action === 'delete') {
    if (!confirm('Delete this reminder?')) return;
    await fetch(ENDPOINTS.delete, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ id })
    });
    loadReminders();
  } else if (action === 'edit') {
    const row = btn.closest('tr').children;
    document.getElementById('title').value = row[0].textContent;
    const scheduled = row[1].textContent.trim();
    if (scheduled) {
      const [d, t] = scheduled.split(' ');
      document.getElementById('date').value = d;
      document.getElementById('time').value = t?.slice(0,5) || '';
    }
    document.getElementById('frequency').value = row[2].textContent || 'once';
    document.getElementById('message').value = '';
    document.getElementById('reminder_id').value = id;
    submitBtn.textContent = 'Update Reminder';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const payload = {
    id: document.getElementById('reminder_id').value || undefined,
    title: document.getElementById('title').value.trim(),
    message: document.getElementById('message').value.trim(),
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    frequency: document.getElementById('frequency').value
  };

  console.log('Payload object:', payload);
  console.log('Payload JSON string:', JSON.stringify(payload));


  const isUpdate = !!payload.id;
  const url = isUpdate ? ENDPOINTS.update : ENDPOINTS.create;

  submitBtn.disabled = true;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
    await res.json();
    resetFormView();
    loadReminders();
  } catch (err) {
    console.error(err);
    alert('There was an error. Please try again.');
  } finally {
    submitBtn.disabled = false;
  }
});

resetBtn.addEventListener('click', resetFormView);
refreshBtn.addEventListener('click', loadReminders);
loadReminders();
