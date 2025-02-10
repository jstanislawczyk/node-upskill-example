import { NotificationHandler, NotificationRepository, NotificationService } from './notification.handler';

class TestRepository implements NotificationRepository {
  private notifications: NotificationRepository[] = [];

  public async save(notification: NotificationRepository): Promise<void> {
    this.notifications.push(notification);
  }

  public async findAll(): Promise<NotificationRepository[]> {
    return this.notifications;
  }
}

class TestNotificationService {
  public async push(notification: NotificationRepository): Promise<void> {
    return;
  }
}

describe('NotificationHandler', () => {
  let handler: NotificationHandler;
  let notificationService: NotificationService;
  let notificationRepository: NotificationRepository;

  beforeEach(() => {
    notificationService = new TestNotificationService();
    notificationRepository = new TestRepository();
    handler = new NotificationHandler(notificationService, notificationRepository);
  });

  it('should push and save notification', async () => {
    // Arrange
    const notification = { to: 'test' };

    // Act
    await handler.handle(notification);

    // Assert
    const notifications = await notificationRepository.findAll();
    expect(notifications).toHaveLength(1);
  });
});
