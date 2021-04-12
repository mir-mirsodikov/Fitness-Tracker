<template>
    <vk-card type="default" class="uk-card-hover uk-width-2-3@m uk-margin-auto uk-margin-top uk-margin-bottom">
        <div slot="header">
            <h2 class="uk-margin-remove-bottom">Add Workout</h2>
        </div>
        <div>
            <form>
                <h4 class="uk-margin-remove-bottom">Date</h4>
                <div>
                    <!-- Day selector -->
                    <select class="uk-select uk-width-1-6@m uk-margin-right" v-model="day">
                        <option
                        v-for="(day, index) in new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()"
                        :key="index">
                            {{ day }}
                        </option>
                    </select>
                    <!-- Month selector -->
                    <select class="uk-select uk-width-1-6@m uk-margin-right" v-model="month">
                        <option
                        v-for="(month, index) in monthNames"
                        :key="index">
                        {{ month }}
                        </option>
                    </select>
                    <!-- Year selector -->
                    <select class="uk-select uk-width-1-6@m uk-margin-right" v-model="year">
                        <option
                        v-for="year in [2020, 2021]"
                        :key="year">
                        {{ year }}
                        </option>
                    </select>
                </div>

                <hr class="uk-divider-icon">

                <div id="activities">
                    <h4 class="">Activities</h4>

                    <!-- <SingleActivity 
                    v-for="count in activityCount"
                    :key="count"
                    :count="count"/> -->
                    <div
                    v-for="count in activityCount"
                    :key="count">
                        <div class="uk-card uk-card-default uk-card-hover uk-card-body uk-margin" :id="'activity' + count">
                            <h5>Activity #{{ count }}</h5>
                            <vk-grid gutter="small" class="uk-child-width-1-2@m">
                                <!-- Select workout -->
                                <div>
                                    <label for="workout">Workout</label>
                                    <select class="uk-select workout-select" v-model="activity[count - 1]">
                                        <option value="" selected disabled hidden>Select Workout</option>
                                        <option
                                        v-for="(workout, index) in workouts"
                                        :key="index"
                                        v-show="!activity.includes(workout)"
                                        :value="workout">
                                        {{ workout }}
                                        </option>
                                    </select>
                                </div>

                                <!-- Select number of sets -->
                                <div>
                                    <label for="sets">Sets</label>
                                    <select class="uk-select set-select" v-model="sets[count - 1]">
                                        <option value="" selected disabled hidden>Number of Sets</option>
                                        <option
                                        v-for="sets in 20"
                                        :key="sets"
                                        :value="sets">
                                            {{ sets }}
                                        </option>
                                    </select>
                                </div>
                            </vk-grid>

                            <!-- Workout info -->
                            <div v-if="sets[count - 1]">
                                <div v-for="set in parseInt(sets[count - 1])" :key="set" :id="'set' + set">
                                    <h5 class="uk-margin-remove-bottom uk-margin-top">Set {{ set }}</h5>
                                    <input type="text" class="uk-input uk-width-1-6@m uk-margin-right" placeholder="Reps">
                                    <input type="text" class="uk-input uk-width-1-6@m" placeholder="Weight">
                                    <hr class="uk-divider-small uk-align-center">
                                </div>
                            </div>
                        </div>
                    </div>

                    <vk-button @click="++activityCount">Add Another Activity</vk-button>
                </div>
            </form>
        </div>
        <div slot="footer">
            <vk-button class="uk-align-right uk-margin-remove-bottom" @click="insertActivity">Submit</vk-button>
        </div>
    </vk-card>
</template>

<script>
import Vue from 'vue'
import Vuikit from 'vuikit'
import VuikitIcons from '@vuikit/icons'
// import SingleActivity from './SingleActivity.vue'

import '@vuikit/theme'

import ActivityService from '../ActivityService.js'

Vue.use(Vuikit)
Vue.use(VuikitIcons)

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const workouts = [
    "Squats",
    "Deadlifts",
    "Shoulder Press",
    "Bench Press",
    "Cable Pulls"
];

export default {
    name: 'AddActivity',
    components: {
        // SingleActivity
    },
    data() {
        return {
            monthNames: monthNames,
            day: new Date().getDate(),
            month: monthNames[new Date().getMonth()],
            year: new Date().getFullYear(),
            activityCount: 1,
            workouts: workouts,
            activity: [""],
            sets: [""],
        }
    },
    methods: {
        async insertActivity() {
            // Document that gets pushed to MongoDB
            let post = {
                date: new Date(this.year, monthNames.indexOf(this.month), this.day),
                activities: [{}]
            };


            const foo = document.querySelectorAll('[id^="activity"]');
            // Go through every activity tab
            for (let i = 0; i < this.activityCount; ++i) {
                // Get the name of the workout
                let activityName = foo[i].getElementsByClassName('workout-select')[0].value;
                // Information for said workout
                let activityInfo = [];
                // Loop through each set
                for (let j = 0; j < foo[i].getElementsByClassName('set-select')[0].value; ++j) {
                    // Add to the array the information from each set
                    activityInfo.push({
                        set: j + 1,
                        reps: foo[i].getElementsByTagName('input')[2 * j].value,
                        weight: foo[i].getElementsByTagName('input')[2 * j + 1].value
                    });
                }
                
                // Add to the document the name and info for each workout
                post.activities[i][activityName] = activityInfo; 
            }

            // Call the function to insert the document into Mongo
            ActivityService.insertActivity(post);
        }
    }
}

/* 
{
    date: Date,
    activities: [
        activity_name: [
            {
                set: #
                weight: #
                reps: #
            }
        ],
        activity_name: [
            {
                set: #
                weight: #
                reps: #
            }
        ]
    ]
}
*/

/* 
    object -> array -> array (objects)
*/
</script>