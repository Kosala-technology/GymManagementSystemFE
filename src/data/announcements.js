// Browser-only demo storage. No SMS, email or API requests.
const storageKey = "forwardFitAnnouncements:v1";

const isValidAnnouncement = (item) =>
  item &&
  typeof item.id === "string" &&
  typeof item.title === "string" &&
  typeof item.message === "string" &&
  ["all", "selected"].includes(item.audience) &&
  Array.isArray(item.recipientIds) &&
  item.recipientIds.length > 0 &&
  item.recipientIds.every((id) => typeof id === "string") &&
  typeof item.createdAt === "string" &&
  Number.isFinite(Date.parse(item.createdAt));

// Throw on invalid storage so existing records are not overwritten.
export const readAnnouncements = () => {
  const raw = localStorage.getItem(storageKey);
  const records = raw === null ? [] : JSON.parse(raw);

  if (
    !Array.isArray(records) ||
    !records.every(isValidAnnouncement) ||
    new Set(records.map((item) => item.id)).size !== records.length
  ) {
    throw new Error("Saved announcements could not be read.");
  }

  return records.sort(
    (first, second) =>
      Date.parse(second.createdAt) - Date.parse(first.createdAt),
  );
};

export const saveAnnouncement = (values) => {
  // Read again before saving to include previously stored announcements.
  const records = readAnnouncements();

  const announcement = {
    id: `announcement-${crypto.randomUUID()}`,
    title: values.title.trim(),
    message: values.message.trim(),
    audience: values.audience,
    recipientIds: [...new Set(values.recipientIds)],
    createdAt: new Date().toISOString(),
  };

  if (
    !isValidAnnouncement(announcement) ||
    !announcement.title ||
    !announcement.message ||
    announcement.title.length > 120 ||
    announcement.message.length > 2000
  ) {
    throw new Error("Invalid announcement.");
  }

  const updated = [announcement, ...records];

  localStorage.setItem(storageKey, JSON.stringify(updated));

  return updated;
};

// Customer pages can use this function in the next step.
// Recipients are the explicit IDs saved at creation time.
export const readCustomerAnnouncements = (memberId) =>
  readAnnouncements().filter((item) => item.recipientIds.includes(memberId));
