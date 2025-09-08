// src/screens/ItemDetailScreen.js
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  ButtonText,
  Image,
  Avatar,
  AvatarFallbackText,
} from '@gluestack-ui/themed';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ItemDetailScreen = ({ route, navigation }) => {
  const { itemId } = route.params;

  const item = useSelector((state) => state.items.items.find((i) => i.id === itemId));

  if (!item) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Item not found!</Text>
      </Box>
    );
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: item.name });
  }, [navigation, item.name]);

  const buttonLabel = item.price ? `Buy for $${Number(item.price).toFixed(2)}` : 'Next';

  return (
    <Box flex={1} bg="$white">
      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero image */}
        {item.coverPhotos?.length > 0 && (
          <Image source={{ uri: item.coverPhotos[0] }} alt={item.name} w="$full" h={280} />
        )}

        <VStack p="$4" space="lg">
          {/* Avatar + name + category */}
          <HStack space="md" alignItems="center">
            <Avatar size="md">
              <AvatarFallbackText>{item.name?.substring(0, 2) || 'US'}</AvatarFallbackText>
            </Avatar>
            <VStack>
              <Heading size="lg">{item.name}</Heading>
              {item.category && (
                <Text size="sm" color="$coolGray500">
                  {item.category}
                </Text>
              )}
            </VStack>
          </HStack>

          {/* Price card */}
          <Box p="$4" borderRadius="$lg" borderWidth={1} borderColor="$backgroundLight200">
            {item.price && (
              <Text bold fontSize="$xl">
                ${Number(item.price).toFixed(2)}
              </Text>
            )}
          </Box>

          {/* About Section */}
          {item.description && (
            <Box p="$4" borderRadius="$lg" borderWidth={1} borderColor="$backgroundLight200">
              <Heading size="md" mb="$2">
                About
              </Heading>
              <Text size="md" color="$coolGray700">
                {item.description}
              </Text>
            </Box>
          )}

          {/* Additional Details */}
          {item.attributes?.length > 0 && (
            <Box p="$4" borderRadius="$lg" borderWidth={1} borderColor="$backgroundLight200">
              <Heading size="md" mb="$2">
                Additional Details
              </Heading>
              <VStack space="md">
                {item.attributes.map((a, idx) => (
                  <HStack key={`attr-${idx}`} justifyContent="space-between" alignItems="center">
                    <Text color="$coolGray700">{a.attribute}</Text>
                    <Text bold>{a.value}</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
          )}

          {/* Benefits */}
          {item.benefits?.length > 0 && (
            <Box p="$4" borderRadius="$lg" borderWidth={1} borderColor="$backgroundLight200">
              <Heading size="md" mb="$2">
                Benefits
              </Heading>
              <VStack space="sm">
                {item.benefits.map((b, idx) => (
                  <Text key={`benefit-${idx}`}>• {b}</Text>
                ))}
              </VStack>
            </Box>
          )}

          {/* Category */}
          {item.category && (
            <Box p="$4" borderRadius="$lg" borderWidth={1} borderColor="$backgroundLight200">
              <Heading size="md" mb="$2">
                Category
              </Heading>
              <Text>{item.category}</Text>
            </Box>
          )}
        </VStack>
      </ScrollView>

      {/* Safe-area aware sticky bottom button */}
      <SafeAreaView edges={['bottom']}>
        <Box
          p="$4"
          borderTopWidth={1}
          borderColor="$backgroundLight200"
          bg="$white"
          shadowColor="#000"
          shadowOffset={{ width: 0, height: -2 }}
          shadowOpacity={0.1}
          shadowRadius={4}
          elevation={5}
        >
          <Button
            size="xl"
            borderRadius="$full"
            onPress={() => {
              console.log('Proceeding...');
            }}
          >
            <ButtonText>{buttonLabel}</ButtonText>
          </Button>
        </Box>
      </SafeAreaView>
    </Box>
  );
};

export default ItemDetailScreen;
