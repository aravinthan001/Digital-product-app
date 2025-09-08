// src/screens/ItemsListScreen.js
import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Heading, Text, FlatList, Image, Pressable } from '@gluestack-ui/themed';

const ItemsListScreen = ({ navigation }) => {
  const items = useSelector((state) => state.items.items);

  const renderItem = ({ item }) => (
    <Pressable
      flex={1}
      m="$2"
      borderRadius="$lg"
      overflow="hidden"
      sx={{
        _light: { bg: '$backgroundLight50' },
        _dark: { bg: '$backgroundDark900' },
      }}
      onPress={() => navigation.navigate('ItemDetail', { itemId: item.id })}
    >
      <Box>
        {item.coverPhotos && item.coverPhotos.length > 0 ? (
          <Image source={{ uri: item.coverPhotos[0] }} alt={item.name} w="$full" h={220} />
        ) : (
          <Box w="$full" h={220} bg="$backgroundLight200" />
        )}

        {/* Price overlay */}
        <Box
          px="$3"
          py="$1.5"
          bg="$white"
          borderRadius="$md"
          position="absolute"
          bottom="$2.5"
          right="$2.5"
          borderWidth={1}
          borderColor="$backgroundLight300"
        >
          <Text size="sm" bold>
            ${Number(item.price).toFixed(2)}
          </Text>
        </Box>
      </Box>
      <Box p="$3">
        <Heading size="sm">{item.name}</Heading>
        <Text size="xs" numberOfLines={2} color="$coolGray600">
          {item.description}
        </Text>
      </Box>
    </Pressable>
  );

  return (
    <Box flex={1} bg="$white">
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={1}
        contentContainerStyle={{ padding: 8, flexGrow: 1 }}
        ListEmptyComponent={
          <Box flex={1} justifyContent="center" alignItems="center" p="$8">
            <Heading>No items yet.</Heading>
            <Text color="$coolGray500">Press the '+' button to add one!</Text>
          </Box>
        }
      />

      {/* Floating '+' FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateItemAbout')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 24,
    bottom: 24,
    backgroundColor: '#3b82f6',
    borderRadius: 28,
    elevation: 8,
    zIndex: 10,
  },
  fabText: {
    fontSize: 30,
    color: 'white',
    lineHeight: 36,
  },
});

export default ItemsListScreen;
