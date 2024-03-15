export default async function updateUserinDb(user, mutateUser) {
  if (!user) return;
  const response = await fetch(`/api/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    await mutateUser();
  } else {
    throw new Error("Failed to update user data.");
  }
}
