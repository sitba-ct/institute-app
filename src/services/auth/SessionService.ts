function getSessionFromStorage(): string | null {
  var session = localStorage.getItem(
    process.env.REACT_APP_SUPABASE_SESSION_KEY!
  );
  console.log(session);

  return session;
}

export default getSessionFromStorage;
