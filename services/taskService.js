export async function getTasks() {
  const token = localStorage.getItem("token");
  const res = await fetch("/api/tasks", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!res.ok) throw new Error("Erro ao buscar tasks");
  return res.json();
}

export async function createTask(title) {
  const token = localStorage.getItem("token");
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("Erro ao criar task");
  return res.json();
}

export async function updateTask(id, updates) {
  const token = localStorage.getItem("token");
  const res = await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Erro ao atualizar task");
  return res.json();
}

export async function deleteTask(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!res.ok) throw new Error("Erro ao deletar task");
  return res.json();
}
