const STORAGE_KEY = "gbu_grievances";

export function loadGrievances() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to load grievances from localStorage:", error);
    return [];
  }
}

export function saveGrievances(grievances) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(grievances));
  } catch (error) {
    console.error("Failed to save grievances to localStorage:", error);
  }
}