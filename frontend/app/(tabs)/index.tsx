import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';

const Card: React.FC<{ style?: any; children: React.ReactNode }> = ({ style, children }) => {
  return (
    <View style={style}>
      {children}
    </View>
  );
};

interface Application {
  _id: string;
  position: string;
  jobType: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  location: {
    city: string;
    state: string;
    country: string;
    type: string;
  };
  company: {
    $oid: string;
  };
  hasApplied: boolean;
  isEligible: boolean;
  currentStatus: string;
  statusHistory: Array<{
    status: string;
    notes: string;
    _id: string;
    date: string; // Adjusted to string for simplicity
  }>;
  // Add other fields as necessary
}

const Dashboard: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/applications');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setApplications(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const renderItem = ({ item }: { item: Application }) => (
    <Card style={styles.card}>
      <Text style={styles.position}>{item.position}</Text>
      <Text>Job Type: {item.jobType}</Text>
      <Text>Salary: {item.salary.min} - {item.salary.max} {item.salary.currency}</Text>
      <Text>Location: {item.location.city}, {item.location.state}, {item.location.country}</Text>
      <Text>Status: {item.currentStatus}</Text>
      {/* Add more fields as necessary */}
    </Card>
  );

  return (
    <FlatList
      data={applications}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  position: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Dashboard;