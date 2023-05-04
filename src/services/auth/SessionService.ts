function getSessionFromStorage(): string | null {
  var session = localStorage.getItem(
    process.env.REACT_APP_SUPABASE_SESSION_KEY!
  );
  return session;
}

export default getSessionFromStorage;
