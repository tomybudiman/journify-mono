import React, { useCallback, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { Controller, FieldError, useForm } from "react-hook-form";

import { CreateJournalPayload } from "@features/journal/types";
import Button from "@shared/components/core/Button.tsx";
import TextInput from "@shared/components/core/TextInput.tsx";
import { colors, textStyles } from "@shared/constants";

export interface JournalFormValues {
  date: string;
  title: string;
  answer1: string;
  answer2: string;
  answer3: string;
}

export interface JournalFormProps {
  initialValues?: CreateJournalPayload;
  onSubmit: (data: CreateJournalPayload) => void;
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
  scrollView: {
    flex: 1,
    flexDirection: "column",
  },
  scrollViewContentContainer: {
    gap: 16,
    paddingVertical: 16,
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
    paddingBottom: 16,
    paddingHorizontal: 24,
    justifyContent: "flex-end",
  },
  dateTouchable: {
    height: 48,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  dateTouchableError: {
    borderColor: colors.error,
  },
  datePlaceholderText: {
    color: colors.textSecondary,
    ...textStyles.bodyMedium,
  },
  dateValueText: {
    color: colors.textPrimary,
    ...textStyles.bodyMedium,
  },
});

/**
 * @description Parses a CreateJournalPayload into JournalFormValues for form prefill.
 * Content is expected to be a JSON stringified array of { question, answer } objects.
 */
const parseInitialValues = (
  initial: CreateJournalPayload,
): Partial<JournalFormValues> => {
  let parsed: { question: string; answer: string }[];
  try {
    parsed = JSON.parse(initial.content);
  } catch {
    parsed = [];
  }
  return {
    date: initial.date,
    title: initial.title,
    answer1: parsed[0]?.answer ?? "",
    answer2: parsed[1]?.answer ?? "",
    answer3: parsed[2]?.answer ?? "",
  };
};

export default function JournalForm({
  onSubmit,
  initialValues,
}: JournalFormProps): React.JSX.Element {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid, isSubmitting },
  } = useForm<JournalFormValues>({
    mode: "onChange",
    defaultValues: initialValues
      ? parseInitialValues(initialValues)
      : {
          date: "",
          title: "",
          answer1: "",
          answer2: "",
          answer3: "",
        },
  });
  const [showIOSPicker, setShowIOSPicker] = useState<boolean>(false);

  /**
   * @description Opens the date picker. Uses imperative API on Android, state-driven component on iOS.
   */
  const handleOpenDatePicker = useCallback(
    (onChange: (value: string) => void, currentValue: string) => {
      const currentDate = currentValue ? new Date(currentValue) : new Date();
      if (Platform.OS === "android") {
        DateTimePickerAndroid.open({
          mode: "date",
          value: currentDate,
          onValueChange: (_, selectedDate) => {
            if (!selectedDate) {
              return;
            }
            onChange(selectedDate.toISOString().split("T")[0]);
          },
        });
      } else {
        setShowIOSPicker(true);
      }
    },
    [],
  );

  /**
   * @description Transforms form values into journal payload format with serialized Q&A content.
   */
  const transformFormValues = useCallback(
    (values: JournalFormValues): CreateJournalPayload => ({
      date: values.date,
      title: values.title,
      content: JSON.stringify(
        answerFields.map((field, i) => ({
          question: journalQuestions[i],
          answer: values[field],
        })),
      ),
    }),
    [],
  );

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
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContentContainer}>
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
        <Controller
          name="date"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState }) => (
            <View style={styles.questionFieldContainer}>
              <Text style={styles.questionText}>Journal Date:</Text>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => handleOpenDatePicker(onChange, value)}
                style={[
                  styles.dateTouchable,
                  !!fieldState.error && styles.dateTouchableError,
                ]}>
                <Text
                  style={
                    value ? styles.dateValueText : styles.datePlaceholderText
                  }>
                  {value
                    ? new Intl.DateTimeFormat("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(value))
                    : "Select date"}
                </Text>
              </TouchableOpacity>
              {fieldState.error && (
                <Text style={styles.errorMessage}>
                  {resolveErrorMessage(fieldState.error)}
                </Text>
              )}
              {Platform.OS === "ios" && showIOSPicker && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={value ? new Date(value) : new Date()}
                  onValueChange={(_, selectedDate) => {
                    setShowIOSPicker(false);
                    if (!selectedDate) {
                      return;
                    }
                    onChange(selectedDate.toISOString().split("T")[0]);
                  }}
                  onDismiss={() => setShowIOSPicker(false)}
                />
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
                  multiline={true}
                  allowClear={true}
                  scrollEnabled={false}
                  onChangeText={onChange}
                  style={styles.textArea}
                  error={!!fieldState.error}
                  onBlur={() => {
                    onChange(value.trim());
                    onBlur();
                  }}
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
          disabled={!isValid || isSubmitting}
          onPress={handleSubmit(values =>
            onSubmit(transformFormValues(values)),
          )}>
          Save Journal
        </Button>
      </View>
    </View>
  );
}
