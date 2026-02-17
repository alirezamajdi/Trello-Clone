import { useSensors, useSensor, PointerSensor } from "@dnd-kit/core";

export const useAppSensors = () => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );
  return { sensors };
};
