// src/screens/CreateItemDetailsScreen.js
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/itemsSlice';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Input,
  InputField,
  Icon,
  AddIcon,
  TrashIcon,
  Pressable,
  Button,
  ButtonText,
  FormControl,
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectItem,
  ChevronDownIcon,
} from '@gluestack-ui/themed';

const CreateItemDetailsScreen = ({ route, navigation }) => {
  const { itemData } = route.params || {};
  const dispatch = useDispatch();

  const [benefits, setBenefits] = useState([{ id: `b-${Date.now()}`, value: '' }]);
  const [attributes, setAttributes] = useState([
    { id: `a-${Date.now()}`, attribute: '', value: '' },
  ]);
  const [category, setCategory] = useState('');

  const handleAddBenefit = () => setBenefits((p) => [...p, { id: `b-${Date.now()}`, value: '' }]);

  const handleBenefitChange = (text, id) =>
    setBenefits((p) => p.map((b) => (b.id === id ? { ...b, value: text } : b)));

  const handleDeleteBenefit = (id) => setBenefits((p) => p.filter((b) => b.id !== id));

  const handleAddAttribute = () =>
    setAttributes((p) => [...p, { id: `a-${Date.now()}`, attribute: '', value: '' }]);

  const handleAttributeChange = (text, id, field) =>
    setAttributes((p) => p.map((a) => (a.id === id ? { ...a, [field]: text } : a)));

  const handleDeleteAttribute = (id) => setAttributes((p) => p.filter((a) => a.id !== id));

  const handleSave = () => {
    const finalItem = {
      ...itemData,
      benefits: benefits.map((b) => b.value).filter(Boolean),
      attributes: attributes.filter((a) => a.attribute && a.value),
      category,
      id: Date.now().toString(),
    };
    dispatch(addItem(finalItem));
    navigation.popToTop();
  };

  const canNext = category.trim().length > 0;

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <Box flex={1} bg="$white" p="$5" pb="$24">
        <VStack space="xl">
          {/* Benefits Section */}
          <FormControl>
            <HStack justifyContent="space-between" alignItems="center" mb="$2">
              <Heading size="md" color="$textDark800">
                Benefits
              </Heading>
              <Pressable onPress={handleAddBenefit}>
                <HStack alignItems="center" space="sm">
                  <Icon as={AddIcon} size="xs" color="$primary500" />
                  <Text color="$primary500">Add</Text>
                </HStack>
              </Pressable>
            </HStack>

            <VStack space="md">
              {benefits.map((b, idx) => (
                <HStack key={b.id} space="md" alignItems="center">
                  <Input flex={1} size="xl" variant="outline" borderRadius="$lg">
                    <InputField
                      value={b.value}
                      onChangeText={(t) => handleBenefitChange(t, b.id)}
                      placeholder={`Benefit #${idx + 1}`}
                    />
                  </Input>
                  <Pressable onPress={() => handleDeleteBenefit(b.id)}>
                    <Icon as={TrashIcon} color="$error600" />
                  </Pressable>
                </HStack>
              ))}
            </VStack>
          </FormControl>

          {/* Additional details (attributes) */}
          <FormControl>
            <HStack justifyContent="space-between" alignItems="center" mb="$2">
              <Heading size="md" color="$textDark800">
                Additional details
              </Heading>
              <Pressable onPress={handleAddAttribute}>
                <HStack alignItems="center" space="sm">
                  <Icon as={AddIcon} size="xs" color="$primary500" />
                  <Text color="$primary500">Add</Text>
                </HStack>
              </Pressable>
            </HStack>

            <VStack space="md">
              {attributes.map((a) => (
                <HStack key={a.id} space="md" alignItems="center">
                  <Input flex={1} size="xl" variant="outline" borderRadius="$lg">
                    <InputField
                      value={a.attribute}
                      onChangeText={(t) => handleAttributeChange(t, a.id, 'attribute')}
                      placeholder="Attribute"
                    />
                  </Input>
                  <Input flex={1} size="xl" variant="outline" borderRadius="$lg">
                    <InputField
                      value={a.value}
                      onChangeText={(t) => handleAttributeChange(t, a.id, 'value')}
                      placeholder="Value"
                    />
                  </Input>
                  <Pressable onPress={() => handleDeleteAttribute(a.id)}>
                    <Icon as={TrashIcon} color="$error600" />
                  </Pressable>
                </HStack>
              ))}
            </VStack>
          </FormControl>

          {/* Category */}
          <FormControl>
            <Heading size="md" mb="$2" color="$textDark800">
              Category
            </Heading>
            <Select onValueChange={setCategory} selectedValue={category}>
              <SelectTrigger variant="outline" size="xl" borderRadius="$lg">
                <SelectInput placeholder="Select a category" />
                <Icon as={ChevronDownIcon} mr="$3" />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectItem label="Photography" value="Photography" />
                  <SelectItem label="Digital Art" value="Digital Art" />
                  <SelectItem label="Consulting" value="Consulting" />
                  <SelectItem label="Apparel" value="Apparel" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </FormControl>
        </VStack>

        {/* Bottom button */}
        <Box position="absolute" left={0} right={0} bottom={0} p="$5" bg="$white">
          <Button size="xl" onPress={handleSave} isDisabled={!canNext}>
            <ButtonText>Next</ButtonText>
          </Button>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default CreateItemDetailsScreen;
