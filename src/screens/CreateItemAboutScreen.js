// src/screens/CreateItemAboutScreen.js
import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Input,
  InputField,
  Textarea,
  TextareaInput,
  Pressable,
  Icon,
  AddIcon,
  Image,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';

const MAX_DESC = 2000;
const MAX_COVERS = 5;

const CreateItemAboutScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceRaw, setPriceRaw] = useState('');
  const [coverPhotos, setCoverPhotos] = useState([]); // array of local URIs

  const price = useMemo(() => {
    const n = Number(String(priceRaw).replace(/[^0-9.]/g, ''));
    return Number.isFinite(n) ? n : 0;
  }, [priceRaw]);

  const canProceed =
    name.trim().length > 0 && description.trim().length > 0 && price > 0;

  // === Pick image from gallery ===
  const pickImage = () => {
    if (coverPhotos.length >= MAX_COVERS) {
      Alert.alert('Limit Reached', 'You can only upload up to 5 photos.');
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      },
      (response) => {
        if (response.didCancel) {
          return;
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Something went wrong.');
        } else if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          setCoverPhotos([...coverPhotos, uri]);
        }
      }
    );
  };

  const removeCoverAt = (idx) => {
    const copy = [...coverPhotos];
    copy.splice(idx, 1);
    setCoverPhotos(copy);
  };

  const handleNext = () => {
    const itemData = {
      name: name.trim(),
      description: description.trim(),
      price,
      coverPhotos,
    };
    navigation.navigate('CreateItemDetails', { itemData });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={{ flex: 1, backgroundColor: 'white' }}
    >
      <Box flex={1} bg="$white" p="$5">
        <VStack space="lg">
          {/* Name */}
          <Input variant="outline" size="xl" borderRadius="$lg">
            <InputField
              value={name}
              onChangeText={setName}
              placeholder="Name"
            />
          </Input>

          {/* Description */}
          <VStack space="xs">
            <Textarea variant="outline" size="xl" borderRadius="$lg" h={140}>
              <TextareaInput
                value={description}
                onChangeText={(t) =>
                  setDescription(
                    t.length <= MAX_DESC ? t : t.slice(0, MAX_DESC)
                  )
                }
                placeholder="Description"
                textAlignVertical="top"
                multiline
              />
            </Textarea>
            <HStack justifyContent="flex-end">
              <Text color="$coolGray400">
                {MAX_DESC - description.length}
              </Text>
            </HStack>
          </VStack>

          {/* Cover photos */}
          <VStack space="sm">
            <HStack justifyContent="space-between" alignItems="center">
              <Heading size="sm" color="$textDark800">
                Cover photos
              </Heading>
              <Text size="xs" color="$coolGray500">
                (Upload up to 5 photos)
              </Text>
            </HStack>

            <HStack space="md" flexWrap="wrap">
              {coverPhotos.map((uri, idx) => (
                <Pressable
                  key={`cover-${idx}`}
                  onLongPress={() => removeCoverAt(idx)}
                  borderRadius="$lg"
                  overflow="hidden"
                  w={96}
                  h={96}
                  borderWidth={1}
                  borderColor="$backgroundLight300"
                  alignItems="center"
                  justifyContent="center"
                  bg="$backgroundLight50"
                >
                  <Image source={{ uri }} alt={`cover-${idx}`} w="$full" h="$full" />
                </Pressable>
              ))}

              {coverPhotos.length < MAX_COVERS && (
                <Pressable
                  onPress={pickImage}
                  borderRadius="$lg"
                  w={96}
                  h={96}
                  borderWidth={1}
                  borderColor="$backgroundLight300"
                  alignItems="center"
                  justifyContent="center"
                  bg="$backgroundLight50"
                >
                  <Icon as={AddIcon} size="lg" color="$primary500" />
                </Pressable>
              )}
            </HStack>
          </VStack>

          {/* Price */}
          <Input variant="outline" size="xl" borderRadius="$lg">
            <InputField
              value={priceRaw}
              onChangeText={setPriceRaw}
              placeholder="$0.00"
              keyboardType="decimal-pad"
            />
          </Input>
        </VStack>

        {/* Bottom button */}
        <Box
          position="absolute"
          left={0}
          right={0}
          bottom={0}
          p="$5"
          bg="$white"
        >
          <Button size="xl" onPress={handleNext} isDisabled={!canProceed}>
            <ButtonText>Next</ButtonText>
          </Button>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default CreateItemAboutScreen;
