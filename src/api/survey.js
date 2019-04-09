const json = {
    "name": "IP test",
    "maxDepth": "3",
    "nodes": [
        {
            "ID": "2",
            "style": 0,
            "value": "Start",
            "height": 40,
            "width": 40,
            "posX": -138.5,
            "posY": 321.5,
            "flows": [
                {
                    "targetID": "3",
                    "value": ""
                }
            ]
        },
        {
            "ID": "3",
            "style": 1,
            "value": "1. Does the IP relate to your study?",
            "lincData": {
                "reason": "Reason for the question"
            },
            "height": 110,
            "width": 120,
            "posX": -40,
            "posY": 290,
            "flows": [
                {
                    "targetID": "5",
                    "value": "No"
                },
                {
                    "targetID": "4",
                    "value": "Yes"
                },
                {
                    "targetID": "6",
                    "value": "I don't know"
                }
            ]
        },
        {
            "ID": "4",
            "style": 1,
            "value": "When does my IP relate to my study?",
            "lincData": {
                "reason": "Reason for the question"
            },
            "height": 90,
            "width": 110,
            "posX": 172,
            "posY": 300,
            "flows": [
                {
                    "targetID": "5",
                    "value": "No"
                }
            ]
        },
        {
            "ID": "5",
            "style": 1,
            "value": "Did you received help from a university employee or did you created the IP during a course?",
            "lincData": {
                "reason": "Reason for the question"
            },
            "height": 180,
            "width": 200,
            "posX": 210,
            "posY": 60,
            "flows": [
                {
                    "targetID": "9",
                    "value": "Yes"
                },
                {
                    "targetID": "10",
                    "value": "No"
                }
            ]
        },
        {
            "ID": "6",
            "style": 1,
            "value": "Do you receive any relevent other support from the unitversity?",
            "lincData": {
                "reason": "Reason for the question"
            },
            "height": 160,
            "width": 190,
            "posX": 210,
            "posY": 450,
            "flows": []
        },
        {
            "ID": "9",
            "style": 1,
            "value": "Have you made any arrangements regarding this support?",
            "lincData": {
                "reason": "Reason for the question"
            },
            "height": 120,
            "width": 200,
            "posX": 478,
            "posY": 338,
            "flows": []
        },
        {
            "ID": "10",
            "style": 1,
            "value": "The University is not the owner of IP by law?",
            "lincData": {
                "reason": "Reason for the question"
            },
            "height": 91,
            "width": 130,
            "posX": 504,
            "posY": 608,
            "flows": []
        }
    ]
}

export default {
    //CB mocks callback beceayse REST API calls typically take some time
    getSurvey(cb) {
        setTimeout(() => cb(json), 100)
    }
} 