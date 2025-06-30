import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Notification = ({ navigation }) => {
  const notifications = [
    {
      id: '1',
      type: 'new_video',
      title: 'New video uploaded',
      message: 'Check out the latest episode of "Tech Review 2024"',
      time: '2 hours ago',
      isRead: false,
      icon: 'play-circle',
      color: '#2b8eff',
    },
    {
      id: '2',
      type: 'download_complete',
      title: 'Download completed',
      message: 'Your video "Amazing Nature Documentary" has been downloaded',
      time: '5 hours ago',
      isRead: true,
      icon: 'download',
      color: '#2ed573',
    },
    {
      id: '3',
      type: 'recommendation',
      title: 'Recommended for you',
      message: 'Based on your watching history, you might like "Cooking Masterclass"',
      time: '1 day ago',
      isRead: true,
      icon: 'star',
      color: '#ffa502',
    },
    {
      id: '4',
      type: 'update',
      title: 'App update available',
      message: 'A new version of VideoApp is available with exciting features',
      time: '2 days ago',
      isRead: true,
      icon: 'refresh',
      color: '#ff4757',
    },
    {
      id: '5',
      type: 'subscription',
      title: 'Subscription reminder',
      message: 'Your premium subscription will expire in 3 days',
      time: '3 days ago',
      isRead: true,
      icon: 'bell',
      color: '#ff6348',
    },
  ];

  const renderNotification = ({ item }) => (
    <TouchableOpacity 
      style={[styles.notificationItem, !item.isRead && styles.unreadNotification]}
      onPress={() => {
        // Handle notification tap
        if (item.type === 'new_video') {
          navigation.navigate('VideoDetailScreen', { 
            video: { 
              id: '1', 
              title: 'Tech Review 2024',
              url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
            } 
          });
        }
      }}
    >
      <View style={[styles.notificationIcon, { backgroundColor: item.color + '20' }]}>
        <FontAwesome name={item.icon} size={20} color={item.color} />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
      {!item.isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  const handleMarkAllRead = () => {
    // Implementation for marking all notifications as read
  };

  const handleClearAll = () => {
    // Implementation for clearing all notifications
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.moreButton}>
          <FontAwesome name="ellipsis-h" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleMarkAllRead}>
          <Text style={styles.actionText}>Mark all read</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleClearAll}>
          <Text style={styles.actionText}>Clear all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.notificationList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#041524',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#0a1a2a',
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  moreButton: {
    padding: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#0a1a2a',
    borderBottomWidth: 1,
    borderBottomColor: '#1a2a3a',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#2b8eff',
    borderRadius: 15,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  notificationList: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#0a1a2a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  unreadNotification: {
    backgroundColor: '#1a2a3a',
    borderLeftWidth: 3,
    borderLeftColor: '#2b8eff',
  },
  notificationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  notificationMessage: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 5,
  },
  notificationTime: {
    color: '#666',
    fontSize: 12,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2b8eff',
  },
});

export default Notification; 