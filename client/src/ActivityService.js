import axios from 'axios';

const url = 'http://localhost:3000/api/activities/'

class ActivityService {
    // async static getActivities() {
        
    // }

    static async insertActivity(activity) {
        return axios.post(url, {
            date: activity.date,
            activities: activity.activities
        });
    }
}

export default ActivityService;