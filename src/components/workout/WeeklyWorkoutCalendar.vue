<template>
  <v-card class="weekly-calendar" rounded="xl" elevation="0">
    <div class="weekly-calendar__header">
      <div>
        <span class="weekly-calendar__eyebrow"> YOUR TRAINING WEEK </span>

        <h2>Weekly Workout Calendar</h2>

        <p>{{ weekLabel }}</p>
      </div>

      <div class="weekly-calendar__controls">
        <v-btn
          icon="mdi-chevron-left"
          variant="outlined"
          size="small"
          aria-label="Previous week"
          @click="changeWeek(-1)"
        />

        <v-btn
          variant="tonal"
          color="primary"
          size="small"
          @click="goToCurrentWeek"
        >
          This Week
        </v-btn>

        <v-btn
          icon="mdi-chevron-right"
          variant="outlined"
          size="small"
          aria-label="Next week"
          @click="changeWeek(1)"
        />
      </div>
    </div>

    <div class="weekly-calendar__grid">
      <div
        v-for="day in weekDays"
        :key="day.key"
        class="weekly-calendar__day"
        :class="{
          'weekly-calendar__day--today': day.isToday,
          'weekly-calendar__day--assigned': day.workouts.length > 0,
        }"
      >
        <span>{{ day.name }}</span>

        <strong>{{ day.date }}</strong>

        <div v-if="day.workouts.length">
          <v-btn
            v-for="workout in day.workouts"
            :key="workout.id"
            color="primary"
            variant="tonal"
            size="small"
            block
            @click="emit('open-schedule', workout.id)"
          >
            <v-icon icon="mdi-dumbbell" start />

            Workout
          </v-btn>
        </div>

        <small v-else>Rest</small>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  schedules: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["open-schedule"]);

// Parse a YYYY-MM-DD date in local time.
const parseDate = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

const dateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Monday is the first day of the week.
const getMonday = (date) => {
  const monday = new Date(date);
  const weekday = (monday.getDay() + 6) % 7;

  monday.setDate(monday.getDate() - weekday);

  return monday;
};

// Initially show the first assigned workout week
// so existing demo schedules are visible.
const assignedDates = props.schedules
  .map((schedule) => parseDate(schedule.scheduledDate))
  .filter(Boolean)
  .sort((a, b) => a - b);

const displayedMonday = ref(getMonday(assignedDates[0] ?? new Date()));

const changeWeek = (direction) => {
  const nextDate = new Date(displayedMonday.value);
  nextDate.setDate(nextDate.getDate() + direction * 7);

  displayedMonday.value = nextDate;
};

const goToCurrentWeek = () => {
  displayedMonday.value = getMonday(new Date());
};

const weekDays = computed(() => {
  const today = dateKey(new Date());

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(displayedMonday.value);
    date.setDate(date.getDate() + index);

    const key = dateKey(date);

    return {
      key,
      name: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      date: date.getDate(),
      isToday: key === today,
      workouts: props.schedules.filter(
        (schedule) => schedule.scheduledDate === key,
      ),
    };
  });
});

const weekLabel = computed(() => {
  const first = weekDays.value[0];
  const last = weekDays.value[6];

  const format = (key) => {
    const date = parseDate(key);

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return `${format(first.key)} – ${format(last.key)}`;
});
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/workout/weekly-workout-calendar.scss"
></style>
