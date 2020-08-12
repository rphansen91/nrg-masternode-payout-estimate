export const isFeatureDetected = async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) return false
  if (!("TimestampTrigger" in window)) return false
  return true
}

export const getNotificationPermissions = async () => {
  const { state } = await navigator.permissions.query({name: 'notifications'})
  return state
}

export const createScheduledNotification = async ({ tag: _tag, title, body, timestamp }: { tag?: string, title: string, body: string, timestamp: number }) => {
  if ((await getNotificationPermissions()) === 'prompt') {
    await Notification.requestPermission();
  }
  if ((await getNotificationPermissions()) !== 'granted') {
    throw new Error('Notification permissions were not granted')
  }
  const now = Date.now()
  if (now > timestamp) {
    throw new Error('Notification timestamp must be set in future')
  }
  const tag = _tag || Math.random().toString().substr(2)
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) {
    const showTrigger = new (window as any).TimestampTrigger(timestamp)
    registration.showNotification(title, {
      tag,
      body,
      showTrigger
    } as any);
  }
};

export const isNotificationScheduled = async ({ tag }: { tag: string }) => {
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) return false
  const notifications = await registration.getNotifications({
    tag,
    includeTriggered: true,
  } as any)
  return Boolean(notifications?.length)
}

export const cancelScheduledNotification = async ({ tag }: { tag: string }) => {
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) return false
  const notifications = await registration.getNotifications({
    tag,
    includeTriggered: true,
  } as any)
  notifications.forEach((notification) => notification.close());
}