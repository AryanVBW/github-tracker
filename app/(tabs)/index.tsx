import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { Dimensions } from 'react-native';
import { WebFriendlyChart } from '../../components/WebFriendlyChart';

export default function Dashboard() {
  const contributionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#1a1a1a',
    backgroundGradientFrom: '#1a1a1a',
    backgroundGradientTo: '#1a1a1a',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(88, 166, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back, NST!</Text>
        <Text style={styles.collegeText}>NST,ADYPU</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>156</Text>
          <Text style={styles.statLabel}>Total PRs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>89</Text>
          <Text style={styles.statLabel}>Merged PRs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>#3</Text>
          <Text style={styles.statLabel}>Rank</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Contribution Activity</Text>
        <WebFriendlyChart
          data={contributionData}
          width={Dimensions.get('window').width - 32}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          bezier
        />
      </View>

      <View style={styles.recentActivity}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>Merged PR: Add new feature</Text>
          <Text style={styles.activityTime}>2h ago</Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>Opened PR: Fix bug in login</Text>
          <Text style={styles.activityTime}>5h ago</Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>Commented on Issue #123</Text>
          <Text style={styles.activityTime}>1d ago</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  header: {
    padding: 16,
    backgroundColor: '#161b22',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  collegeText: {
    fontSize: 16,
    color: '#8b949e',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  statCard: {
    backgroundColor: '#161b22',
    padding: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#58a6ff',
  },
  statLabel: {
    fontSize: 14,
    color: '#8b949e',
    marginTop: 4,
  },
  chartContainer: {
    padding: 16,
    backgroundColor: '#161b22',
    marginVertical: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
  },
  recentActivity: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  activityItem: {
    backgroundColor: '#161b22',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  activityText: {
    fontSize: 16,
    color: '#fff',
  },
  activityTime: {
    fontSize: 14,
    color: '#8b949e',
    marginTop: 4,
  },
});