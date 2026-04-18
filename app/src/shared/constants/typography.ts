export const fontFamily = {
  headline: {
    regular: "Manrope-Regular",
    medium: "Manrope-Medium",
    semiBold: "Manrope-SemiBold",
    bold: "Manrope-Bold",
  },
  body: {
    regular: "Inter-Regular",
    medium: "Inter-Medium",
    semiBold: "Inter-SemiBold",
  },
};

export const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 30,
};

export const lineHeight = {
  xs: 16,
  sm: 18,
  md: 22,
  lg: 24,
  xl: 28,
  xxl: 32,
  xxxl: 38,
};

/**
 * Pre-paired typography presets combining fontFamily, fontSize, and lineHeight.
 * Spread directly into StyleSheet styles alongside a color value.
 *
 * display — hero text, splash screen, onboarding.
 * headline — screen titles, section headers.
 * body — main content, descriptions, paragraph.
 * label — buttons, input labels, badges, tags.
 * caption — timestamps, helper text, metadata.
 */
export const textStyles = {
  displayLarge: {
    fontFamily: fontFamily.headline.bold,
    fontSize: fontSize.xxxl,
    lineHeight: lineHeight.xxxl,
  },
  displayMedium: {
    fontFamily: fontFamily.headline.semiBold,
    fontSize: fontSize.xxl,
    lineHeight: lineHeight.xxl,
  },
  headlineLarge: {
    fontFamily: fontFamily.headline.bold,
    fontSize: fontSize.xl,
    lineHeight: lineHeight.xl,
  },
  headlineMedium: {
    fontFamily: fontFamily.headline.semiBold,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
  },
  headlineSmall: {
    fontFamily: fontFamily.headline.medium,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
  },
  bodyLarge: {
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
  },
  bodyMedium: {
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
  },
  bodySmall: {
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
  labelLarge: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
  },
  labelMedium: {
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
  labelSmall: {
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  },
  caption: {
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  },
} as const;
