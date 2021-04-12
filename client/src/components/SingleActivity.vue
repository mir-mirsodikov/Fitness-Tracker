<template>
    <div class="uk-card uk-card-default uk-card-hover uk-card-body uk-margin">
        <h5>Activity #{{ count }}</h5>
        <vk-grid gutter="small" class="uk-child-width-1-2@m">
            <div>
                <label for="workout">Workout</label>
                <select class="uk-select" v-model="activity">
                    <option value="" selected disabled hidden>Select Workout</option>
                    <option
                    v-for="(activity, index) in activities"
                    :key="index">
                    {{ activity }}
                    </option>
                </select>
            </div>
    
            <div>
                <label for="sets">Sets</label>
                <select class="uk-select" v-model="sets">
                    <option value="" selected disabled hidden>Number of Sets</option>
                    <option
                    v-for="sets in 20"
                    :key="sets">
                        {{ sets }}
                    </option>
                </select>
            </div>
        </vk-grid>


        <div v-if="sets">
            <div v-for="set in parseInt(sets)" :key="set">
                <h5 class="uk-margin-remove-bottom uk-margin-top">Set {{ set }}</h5>
                <input type="text" class="uk-input uk-width-1-6@m uk-margin-right" placeholder="Reps">
                <input type="text" class="uk-input uk-width-1-6@m" placeholder="Weight">
                <hr class="uk-divider-small uk-align-center">
            </div>
        </div>
    </div>
</template>

<script>
// import ActivityInfo from './ActivityInfo.vue'
const workouts = [
    "Squats",
    "Deadlifts",
    "Shoulder Press",
    "Bench Press",
    "Cable Pulls"
];

export default {
    name: 'SingleActivity',
    props: {
        count: {
            type: Number,
            require: true
        }
    },
    data() {
        return {
            activities: workouts,
            activity: "",
            sets: ""
        }
    }
}
</script>