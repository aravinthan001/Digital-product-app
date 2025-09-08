// src/screens/CreateItemAboutScreen.js
import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
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

const currency = (v) => {
  if (v === '' || v == null) return '';
  const n = Number(v);
  if (Number.isNaN(n)) return v;
  return `$${n.toFixed(2)}`;
};

const CreateItemAboutScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceRaw, setPriceRaw] = useState('');
  const [coverPhotos, setCoverPhotos] = useState([]); // array of URLs

  const price = useMemo(() => {
    const n = Number(String(priceRaw).replace(/[^0-9.]/g, ''));
    return Number.isFinite(n) ? n : 0;
  }, [priceRaw]);

  const canProceed = name.trim().length > 0 && description.trim().length > 0 && price > 0;

  const addCoverSlot = () => {
    if (coverPhotos.length >= MAX_COVERS) return;
    setCoverPhotos([...coverPhotos, '']);
  };

  const updateCoverAt = (idx, url) => {
    const copy = [...coverPhotos];
    copy[idx] = url.trim();
    setCoverPhotos(copy);
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
      coverPhotos: coverPhotos.filter(Boolean),
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
            <InputField value={name} onChangeText={setName} placeholder="Name" />
          </Input>

          {/* Description with counter */}
          <VStack space="xs">
            <Textarea variant="outline" size="xl" borderRadius="$lg" h={140}>
              <TextareaInput
                value={description}
                onChangeText={(t) =>
                  setDescription(t.length <= MAX_DESC ? t : t.slice(0, MAX_DESC))
                }
                placeholder="Description"
                textAlignVertical="top"
                multiline
              />
            </Textarea>
            <HStack justifyContent="flex-end">
              <Text color="$coolGray400">{MAX_DESC - description.length}</Text>
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

            {/* Grid of slots */}
            <HStack space="md" flexWrap="wrap">
              {coverPhotos.map((url, idx) => (
                <VStack key={`cover-${idx}`} space="xs">
                  <Pressable
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
                    {url ? (
                      <Image source={{ uri: url }} alt={`cover-${idx}`} w="$full" h="$full" />
                    ) : (
                      <Icon as={AddIcon} size="lg" color="$primary500" />
                    )}
                  </Pressable>
                  <Input w={96} size="sm" variant="outline" borderRadius="$md">
                    <InputField
                      value={url}
                      onChangeText={(t) => updateCoverAt(idx, t)}
                      placeholder="Paste URL"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </Input>
                </VStack>
              ))}

              {coverPhotos.length < MAX_COVERS && (
                <Pressable
                  onPress={addCoverSlot}
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
        <Box position="absolute" left={0} right={0} bottom={0} p="$5" bg="$white">
          <Button size="xl" onPress={handleNext} isDisabled={!canProceed}>
            <ButtonText>Next</ButtonText>
          </Button>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default CreateItemAboutScreen;
