import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Controller, FieldError, useForm } from "react-hook-form";

import Button from "@shared/components/core/Button.tsx";
import TextInput from "@shared/components/core/TextInput.tsx";
import { colors, textStyles } from "@shared/constants";

export interface JournalFormValues {
  title: string;
  answer1: string;
  answer2: string;
  answer3: string;
}

export interface JournalFormProps {
  onSubmit: (data: JournalFormValues) => void;
}

const journalQuestions: string[] = [
  "What is one thing that stood out to you most today, and why?",
  "How are you feeling right now, and what is the main reason behind it?",
  "If you could relive today, which part would you want to change?",
];

const answerFields: (keyof Pick<
  JournalFormValues,
  "answer1" | "answer2" | "answer3"
>)[] = ["answer1", "answer2", "answer3"];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContentContainer: {
    gap: 16,
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  titleTextInput: {
    backgroundColor: colors.surface,
  },
  textArea: {
    lineHeight: 20,
    paddingVertical: 12,
    backgroundColor: colors.surface,
  },
  questionFieldContainer: {
    gap: 4,
  },
  questionText: {
    color: colors.textPrimary,
    ...textStyles.bodyMedium,
  },
  errorMessage: {
    color: colors.error,
    ...textStyles.caption,
  },
  footerContainer: {
    flex: 1,
    paddingBottom: 16,
    paddingHorizontal: 24,
    justifyContent: "flex-end",
  },
});

export default function JournalForm({
  onSubmit,
}: JournalFormProps): React.JSX.Element {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid, isSubmitting },
  } = useForm<JournalFormValues>({
    mode: "onChange",
    defaultValues: {
      title: "",
      answer1: "",
      answer2: "",
      answer3: "",
    },
  });

  /**
   * Resolves the error message with the following priority:
   * 1. Custom message — if provided in the field's validation rules
   * 2. Generic message — mapped from the error type
   * 3. Fallback — "Invalid value"
   */
  const resolveErrorMessage = (error: FieldError): string => {
    if (error.message) {
      return error.message;
    }
    switch (error.type) {
      case "required":
        return "This field is required.";
      default:
        return "Invalid value.";
    }
  };

  /**
   * @description Returns true if at least one answer field has a non-empty value.
   */
  const validateAtLeastOneAnswer = (): boolean | string => {
    const { answer1, answer2, answer3 } = getValues();
    const hasAtLeastOne = [answer1, answer2, answer3].some(
      v => v.trim().length > 0,
    );
    if (!hasAtLeastOne) {
      return "Please answer at least one question.";
    }
    return true;
  };

  // Render
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <View>
              <TextInput
                label="Title"
                value={value}
                mode="outlined"
                onBlur={onBlur}
                allowClear={true}
                onChangeText={onChange}
                style={styles.titleTextInput}
                error={!!fieldState.error}
              />
              {fieldState.error && (
                <Text style={styles.errorMessage}>
                  {resolveErrorMessage(fieldState.error)}
                </Text>
              )}
            </View>
          )}
        />
        {answerFields.map((fieldName, i) => (
          <Controller
            key={fieldName}
            name={fieldName}
            control={control}
            rules={{ validate: validateAtLeastOneAnswer }}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <View style={styles.questionFieldContainer}>
                <Text style={styles.questionText}>{journalQuestions[i]}</Text>
                <TextInput
                  value={value}
                  mode="outlined"
                  onBlur={onBlur}
                  multiline={true}
                  allowClear={true}
                  scrollEnabled={false}
                  onChangeText={onChange}
                  style={styles.textArea}
                  error={!!fieldState.error}
                />
                {fieldState.error && (
                  <Text style={styles.errorMessage}>
                    {resolveErrorMessage(fieldState.error)}
                  </Text>
                )}
              </View>
            )}
          />
        ))}
      </ScrollView>
      <View style={styles.footerContainer}>
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || isSubmitting}>
          Save Journal
        </Button>
      </View>
    </View>
  );
}
