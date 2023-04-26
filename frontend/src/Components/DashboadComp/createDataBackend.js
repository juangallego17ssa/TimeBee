import {setClockID, setClockStart, setClockStop} from "../../redux/Slices/clockSlice";
import {useCreateTrackedTimeMutation} from "../../api/API";


const CreateDataBackend = () => {

    const [createTrackedTime,{isloading,error}]=useCreateTrackedTimeMutation()

    const handleCreateData = async () => {

        const getNumberOfBreaks = () => {
            return Math.ceil(Math.random()*5)
        }

        const isWeekday = (date) => {
            console.log(date)
          const dayOfWeek = date.getDay();
          return dayOfWeek !== 0 && dayOfWeek !== 6;
        }

        const generateData = () => {

            const startDate = new Date(2022,10,2)
            const endDate = new Date(2023,3,28)
            let loopDate = startDate
            let start = new Date()
            let stop = new Date()
            let minDurationInMilliseconds = 0
            let maxDurationInMilliseconds = 0
            let duration = 0

            const trackedTimeArray = []

            while ( loopDate<endDate ) {
                let dayOfWeek = loopDate.getDay();
                let isWeekday = dayOfWeek !== 0 && dayOfWeek !== 6;
                if (isWeekday) {
                    let numberOfBreaks = getNumberOfBreaks()
                    switch (numberOfBreaks) {

                        case 1:
                            start = new Date(loopDate.getFullYear(),
                                loopDate.getMonth(),
                                loopDate.getDate(),
                                8 + Math.round(Math.random()),
                                Math.random()*60,
                                Math.random()*60)
                            minDurationInMilliseconds = (3 * 3600 + 30 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (4 * 3600 + 30 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            stop = new Date(start.getTime()+duration)
                            duration = Math.round((stop.getTime() - start.getTime())/1000)
                            trackedTimeArray.push({
                                "type_of_input":0,
                                "start":start,
                                "stop":stop,
                                "duration":duration,
                            })
                            //////////// 1st Break ////////////
                            minDurationInMilliseconds = (0 * 3600 + 30 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (1 * 3600 + 15 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            start = new Date(stop.getTime()+duration)
                            minDurationInMilliseconds = (4 * 3600 + 0 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (5 * 3600 + 0 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            stop = new Date(start.getTime()+duration)
                            duration = Math.round((stop.getTime() - start.getTime())/1000)
                            trackedTimeArray.push({
                                "type_of_input":0,
                                "start":start,
                                "stop":stop,
                                "duration":duration,
                            })
                            break;

                        case 2:
                            start = new Date(loopDate.getFullYear(),
                                loopDate.getMonth(),
                                loopDate.getDate(),
                                8 + Math.round(Math.random()),
                                Math.random()*60,
                                Math.random()*60)
                            minDurationInMilliseconds = (3 * 3600 + 30 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (4 * 3600 + 30 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            stop = new Date(start.getTime()+duration)
                            duration = Math.round((stop.getTime() - start.getTime())/1000)
                            trackedTimeArray.push({
                                "type_of_input":0,
                                "start":start,
                                "stop":stop,
                                "duration":duration,
                            })
                            //////////// 1st Break ////////////
                            minDurationInMilliseconds = (0 * 3600 + 30 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (1 * 3600 + 15 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            start = new Date(stop.getTime()+duration)
                            minDurationInMilliseconds = (1 * 3600 + 0 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (3 * 3600 + 0 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            stop = new Date(start.getTime()+duration)
                            duration = Math.round((stop.getTime() - start.getTime())/1000)
                            trackedTimeArray.push({
                                "type_of_input":0,
                                "start":start,
                                "stop":stop,
                                "duration":duration
                            })
                            //////////// 2nd Break ////////////
                            minDurationInMilliseconds = (0 * 3600 + 5 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (0 * 3600 + 20 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            start = new Date(stop.getTime()+duration)
                            minDurationInMilliseconds = (2 * 3600 + 0 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (3 * 3600 + 0 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            stop = new Date(start.getTime()+duration)
                            duration = Math.round((stop.getTime() - start.getTime())/1000)
                            trackedTimeArray.push({
                                "type_of_input":0,
                                "start":start,
                                "stop":stop,
                                "duration":duration
                            })
                            break;

                        case 3:
                            start = new Date(loopDate.getFullYear(),
                                loopDate.getMonth(),
                                loopDate.getDate(),
                                8 + Math.round(Math.random()),
                                Math.random()*60,
                                Math.random()*60)
                            minDurationInMilliseconds = (1 * 3600 + 0 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (2 * 3600 + 0 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            stop = new Date(start.getTime()+duration)
                            duration = Math.round((stop.getTime() - start.getTime())/1000)
                            trackedTimeArray.push({
                                "type_of_input":0,
                                "start":start,
                                "stop":stop,
                                "duration":duration
                            })
                            //////////// 1st Break ////////////
                            minDurationInMilliseconds = (0 * 3600 + 2 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (0 * 3600 + 10 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            start = new Date(stop.getTime()+duration)
                            minDurationInMilliseconds = (2 * 3600 + 0 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (3 * 3600 + 0 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            stop = new Date(start.getTime()+duration)
                            duration = Math.round((stop.getTime() - start.getTime())/1000)
                            trackedTimeArray.push({
                                "type_of_input":0,
                                "start":start,
                                "stop":stop,
                                "duration":duration
                            })
                            //////////// 2nd Break ////////////
                            minDurationInMilliseconds = (0 * 3600 + 30 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (1 * 3600 + 0 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            start = new Date(stop.getTime()+duration)
                            minDurationInMilliseconds = (2 * 3600 + 0 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (2 * 3600 + 30 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            stop = new Date(start.getTime()+duration)
                            duration = Math.round((stop.getTime() - start.getTime())/1000)
                            trackedTimeArray.push({
                                "type_of_input":0,
                                "start":start,
                                "stop":stop,
                                "duration":duration
                            })
                            //////////// 3rd Break ////////////
                            minDurationInMilliseconds = (0 * 3600 + 8 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (0 * 3600 + 20 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            start = new Date(stop.getTime()+duration)
                            minDurationInMilliseconds = (2 * 3600 + 30 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (3 * 3600 + 0 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            stop = new Date(start.getTime()+duration)
                            duration = Math.round((stop.getTime() - start.getTime())/1000)
                            trackedTimeArray.push({
                                "type_of_input":0,
                                "start":start,
                                "stop":stop,
                                "duration":duration
                            })
                            break;

                        case 4:
                            start = new Date(loopDate.getFullYear(),
                                loopDate.getMonth(),
                                loopDate.getDate(),
                                8 + Math.round(Math.random()),
                                Math.random()*60,
                                Math.random()*60)
                            minDurationInMilliseconds = (0 * 3600 + 30 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (1 * 3600 + 30 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            stop = new Date(start.getTime()+duration)
                            duration = Math.round((stop.getTime() - start.getTime())/1000)
                            trackedTimeArray.push({
                                "type_of_input":0,
                                "start":start,
                                "stop":stop,
                                "duration":duration
                            })
                            //////////// 1st Break ////////////
                            minDurationInMilliseconds = (0 * 3600 + 5 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (0 * 3600 + 15 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            start = new Date(stop.getTime()+duration)
                            minDurationInMilliseconds = (1 * 3600 + 30 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (2 * 3600 + 30 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            stop = new Date(start.getTime()+duration)
                            duration = Math.round((stop.getTime() - start.getTime())/1000)
                            trackedTimeArray.push({
                                "type_of_input":0,
                                "start":start,
                                "stop":stop,
                                "duration":duration
                            })
                            //////////// 2nd Break ////////////
                            minDurationInMilliseconds = (0 * 3600 + 2 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (0 * 3600 + 10 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            start = new Date(stop.getTime()+duration)
                            minDurationInMilliseconds = (0 * 3600 + 30 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (1 * 3600 + 30 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            stop = new Date(start.getTime()+duration)
                            duration = Math.round((stop.getTime() - start.getTime())/1000)
                            trackedTimeArray.push({
                                "type_of_input":0,
                                "start":start,
                                "stop":stop,
                                "duration":duration
                            })
                            //////////// 3rd Break ////////////
                            minDurationInMilliseconds = (0 * 3600 + 45 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (1 * 3600 + 5 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            start = new Date(stop.getTime()+duration)
                            minDurationInMilliseconds = (2 * 3600 + 0 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (3 * 3600 + 0 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            stop = new Date(start.getTime()+duration)
                            duration = Math.round((stop.getTime() - start.getTime())/1000)
                            trackedTimeArray.push({
                                "type_of_input":0,
                                "start":start,
                                "stop":stop,
                                "duration":duration
                            })
                            //////////// 4st Break ////////////
                            minDurationInMilliseconds = (0 * 3600 + 10 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (0 * 3600 + 15 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            start = new Date(stop.getTime()+duration)
                            minDurationInMilliseconds = (1 * 3600 + 30 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (2 * 3600 + 30 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            stop = new Date(start.getTime()+duration)
                            duration = Math.round((stop.getTime() - start.getTime())/1000)
                            trackedTimeArray.push({
                                "type_of_input":0,
                                "start":start,
                                "stop":stop,
                                "duration":duration
                            })
                            break;

                        case 5:
                            start = new Date(loopDate.getFullYear(),
                                loopDate.getMonth(),
                                loopDate.getDate(),
                                8 + Math.round(Math.random()),
                                Math.random()*60,
                                Math.random()*60)
                            minDurationInMilliseconds = (0 * 3600 + 30 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (1 * 3600 + 30 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            stop = new Date(start.getTime()+duration)
                            duration = Math.round((stop.getTime() - start.getTime())/1000)
                            trackedTimeArray.push({
                                "type_of_input":0,
                                "start":start,
                                "stop":stop,
                                "duration":duration
                            })
                            //////////// 1st Break ////////////
                            minDurationInMilliseconds = (0 * 3600 + 3 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (0 * 3600 + 8 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            start = new Date(stop.getTime()+duration)
                            minDurationInMilliseconds = (1 * 3600 + 30 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (2 * 3600 + 30 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            stop = new Date(start.getTime()+duration)
                            duration = Math.round((stop.getTime() - start.getTime())/1000)
                            trackedTimeArray.push({
                                "type_of_input":0,
                                "start":start,
                                "stop":stop,
                                "duration":duration
                            })
                            //////////// 2nd Break ////////////
                            minDurationInMilliseconds = (0 * 3600 + 2 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (0 * 3600 + 8 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            start = new Date(stop.getTime()+duration)
                            minDurationInMilliseconds = (0 * 3600 + 30 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (1 * 3600 + 30 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            stop = new Date(start.getTime()+duration)
                            duration = Math.round((stop.getTime() - start.getTime())/1000)
                            trackedTimeArray.push({
                                "type_of_input":0,
                                "start":start,
                                "stop":stop,
                                "duration":duration
                            })
                            //////////// 3rd Break ////////////
                            minDurationInMilliseconds = (0 * 3600 + 35 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (1 * 3600 + 5 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            start = new Date(stop.getTime()+duration)
                            minDurationInMilliseconds = (2 * 3600 + 0 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (3 * 3600 + 0 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            stop = new Date(start.getTime()+duration)
                            duration = Math.round((stop.getTime() - start.getTime())/1000)
                            trackedTimeArray.push({
                                "type_of_input":0,
                                "start":start,
                                "stop":stop,
                                "duration":duration
                            })
                            //////////// 4st Break ////////////
                            minDurationInMilliseconds = (0 * 3600 + 2 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (0 * 3600 + 5 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            start = new Date(stop.getTime()+duration)
                            minDurationInMilliseconds = (0 * 3600 + 30 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (1 * 3600 + 30 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            stop = new Date(start.getTime()+duration)
                            duration = Math.round((stop.getTime() - start.getTime())/1000)
                            trackedTimeArray.push({
                                "type_of_input":0,
                                "start":start,
                                "stop":stop,
                                "duration":duration
                            })
                            //////////// 5st Break ////////////
                            minDurationInMilliseconds = (0 * 3600 + 10 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (0 * 3600 + 20 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            start = new Date(stop.getTime()+duration)
                            minDurationInMilliseconds = (0 * 3600 + 30 * 60 + 0) * 1000
                            maxDurationInMilliseconds = (1 * 3600 + 30 * 60 + 0) * 1000
                            duration = (minDurationInMilliseconds+ Math.ceil(Math.random()*(maxDurationInMilliseconds-minDurationInMilliseconds)))
                            stop = new Date(start.getTime()+duration)
                            duration = Math.round((stop.getTime() - start.getTime())/1000)
                            trackedTimeArray.push({
                                "type_of_input":0,
                                "start":start,
                                "stop":stop,
                                "duration":duration
                            })
                            break;
                    }
                }
                loopDate = new Date(loopDate.getTime() + 24*3600*1000);
            }

            return trackedTimeArray
        }


        let data = [
            {
                "start": new Date(2023, 4, 21, 15, 25, 30),
                "stop": new Date(2023, 4, 21, 15, 30, 30)
            },
        ]

        console.log("is going to generate")
        data = generateData()


        for (let datapoint of data) {

            const body={
                "type_of_input": 0,
                "start": datapoint.start,
                "stop": datapoint.stop,
                "duration": datapoint.duration,
            }
            createTrackedTime(body)
        }
    }


    return(
        <button onClick={handleCreateData}>Press to create data</button>
    )
}


export default CreateDataBackend