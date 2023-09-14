const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

//Build the express app
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.get('/status', (req, res) => {
    res.send({
        message: 'hello world!'
    })
})


app.get('/api/v1/programs/4.json', (req, res) => {
    res.send({
        "project": {
            "id": 4,
            "name": "End User Device Refresh",
            "description": "",
            "created_at": "2020-02-25T14:15:38.000-05:00",
            "updated_at": "2021-08-25T09:44:50.000-04:00",
            "uuid": "b4c268c1-585a-4d5d-8889-f613710e154c",
            "project_type_id": 1,
            "status": "active",
            "progress": 46,
            "project_type": "Network Upgrade",
            "users": [
                {
                    "id": 8,
                    "email": "juan.rivera@microhealthllc.com",
                    "first_name": "juan.rivera@microhealthllc.com",
                    "last_name": "juan.rivera@microhealthllc.com",
                    "title": "Developer",
                    "phone_number": "+15085963665",
                    "status": "active",
                    "full_name": "juan.rivera@microhealthllc.com juan.rivera@microhealthllc.com",
                    "organization": "Test Org"
                }
            ],
            "facilities": [
                {
                    "id": 1421,
                    "facility_id": 1425,
                    "project_id": 4,
                    "created_at": "2021-05-25T11:27:27.000-04:00",
                    "updated_at": "2023-01-31T18:04:15.000-05:00",
                    "due_date": null,
                    "status_id": 4,
                    "progress": 0,
                    "color": "#ff0000",
                    "facility_group_id": 72,
                    "project_facility_group_id": null,
                    "class": "FacilityProject",
                    "project_status": "Not Started",
                    "facility_project_id": 1421,
                    "facility_name": "MicroHealth HQ",
                    "facility": {
                        "id": 1425,
                        "facility_name": "MicroHealth HQ",
                        "region_name": 0,
                        "address": "8229 Boone Blvd, Vienna, VA 22182, USA",
                        "point_of_contact": "Mark Jones",
                        "phone_number": "+18552943547",
                        "email": "mark.jones@microhealthllc.com",
                        "created_at": "2021-05-19T11:13:14.000-04:00",
                        "updated_at": "2023-09-07T15:03:55.000-04:00",
                        "facility_group_id": 72,
                        "creator_id": 2,
                        "lat": "38.91545430000001",
                        "lng": "-77.2310674",
                        "status": "active",
                        "country_code": "US",
                        "project_facility_group_id": null,
                        "is_portfolio": true,
                        "project_id": 4,
                        "facility_group_name": "Vendor",
                        "facility_group_status": "inactive"
                    },
                    "tasks": [
                        {
                            "id": 331,
                            "text": "yfyfy",
                            "description": "",
                            "due_date": "2021-07-31",
                            "created_at": "2021-07-19T11:06:13.000-04:00",
                            "updated_at": "2021-07-19T11:06:13.000-04:00",
                            "progress": 0,
                            "task_type_id": 4,
                            "start_date": "2021-07-19",
                            "facility_project_id": 1421,
                            "auto_calculate": true,
                            "watched": false,
                            "watched_at": null,
                            "task_stage_id": 2,
                            "kanban_order": 0,
                            "important": false,
                            "ongoing": false,
                            "draft": false,
                            "on_hold": false,
                            "reportable": false,
                            "closed_date": null,
                            "contract_id": null,
                            "project_contract_id": null,
                            "project_contract_vehicle_id": null,
                            "owner_id": null,
                            "owner_type": null,
                            "planned_effort": "0",
                            "actual_effort": "0",
                            "auto_calculate_planned_effort": true,
                            "class_name": "Task",
                            "attach_files": [],
                            "progress_status": "active",
                            "task_type": "Training",
                            "task_stage": "Not Started",
                            "user_ids": [],
                            "due_date_duplicate": "2021-07-31",
                            "user_names": "",
                            "users": [],
                            "checklists": [
                                {
                                    "id": 315,
                                    "listable_type": "Task",
                                    "listable_id": 331,
                                    "checked": false,
                                    "text": "sdfasdasfd",
                                    "created_at": "2023-02-06T14:05:40.000-05:00",
                                    "updated_at": "2023-02-06T14:05:40.000-05:00",
                                    "user_id": 11,
                                    "position": 0,
                                    "due_date": null,
                                    "planned_effort": "0.0",
                                    "user": {
                                        "id": 11,
                                        "full_name": "admin@example.com admin@example.com"
                                    },
                                    "progress_lists": [
                                        {
                                            "id": 38,
                                            "body": "sdfafssf",
                                            "user_id": 11,
                                            "checklist_id": 315,
                                            "created_at": "2023-02-06T14:05:40.000-05:00",
                                            "updated_at": "2023-02-06T14:05:40.000-05:00",
                                            "user": {
                                                "id": 11,
                                                "full_name": "admin@example.com admin@example.com"
                                            }
                                        }
                                    ]
                                }
                            ],
                            "notes": [],
                            "completed": false,
                            "program_name": "End User Device Refresh",
                            "project_group": "Vendor",
                            "notes_updated_at": [],
                            "last_update": null,
                            "is_overdue": true,
                            "planned": false,
                            "closed": false,
                            "in_progress": false,
                            "responsible_users": [],
                            "responsible_users_last_name": [],
                            "responsible_users_first_name": [],
                            "accountable_users": [],
                            "accountable_users_last_name": [],
                            "accountable_users_first_name": [],
                            "consulted_users": [],
                            "informed_users": [],
                            "responsible_user_ids": [],
                            "accountable_user_ids": [],
                            "consulted_user_ids": [],
                            "informed_user_ids": [],
                            "facility_id": 1425,
                            "facility_name": "MicroHealth HQ",
                            "contract_nickname": null,
                            "vehicle_nickname": null,
                            "project_id": 4,
                            "sub_tasks": [],
                            "sub_issues": [],
                            "sub_task_ids": [],
                            "sub_issue_ids": [],
                            "sub_risk_ids": []
                        }
                    ],
                    "issues": [
                        {
                            "id": 90,
                            "title": "gcvg",
                            "description": "",
                            "issue_type_id": 4,
                            "issue_severity_id": 2,
                            "facility_project_id": 1421,
                            "start_date": "2021-07-20",
                            "due_date": "2021-07-28",
                            "created_at": "2021-07-19T11:06:54.000-04:00",
                            "updated_at": "2021-07-19T11:06:54.000-04:00",
                            "progress": 0,
                            "auto_calculate": true,
                            "watched": false,
                            "watched_at": null,
                            "issue_stage_id": 3,
                            "kanban_order": 0,
                            "task_type_id": null,
                            "important": false,
                            "draft": false,
                            "on_hold": false,
                            "reportable": false,
                            "contract_id": null,
                            "project_contract_id": null,
                            "project_contract_vehicle_id": null,
                            "owner_id": null,
                            "owner_type": null,
                            "class_name": "Issue",
                            "progress_status": "active",
                            "attach_files": [],
                            "completed": false,
                            "planned": false,
                            "program_name": "End User Device Refresh",
                            "in_progress": false,
                            "issue_type": "Issue type 3",
                            "project_group": "Vendor",
                            "issue_stage": "In Progress",
                            "issue_severity": "low severity",
                            "task_type_name": null,
                            "due_date_duplicate": "2021-07-28",
                            "responsible_user_names": "",
                            "user_names": "",
                            "user_ids": [],
                            "users": [],
                            "is_overdue": true,
                            "responsible_users": [],
                            "responsible_users_last_name": [],
                            "responsible_users_first_name": [],
                            "accountable_users": [],
                            "accountable_users_last_name": [],
                            "accountable_users_first_name": [],
                            "consulted_users": [],
                            "informed_users": [],
                            "responsible_user_ids": [],
                            "accountable_user_ids": [],
                            "consulted_user_ids": [],
                            "informed_user_ids": [],
                            "checklists": [],
                            "notes": [],
                            "notes_updated_at": [],
                            "last_update": null,
                            "facility_id": 1425,
                            "facility_name": "MicroHealth HQ",
                            "contract_nickname": null,
                            "vehicle_nickname": null,
                            "project_id": 4,
                            "sub_tasks": [],
                            "sub_issues": [],
                            "sub_task_ids": [],
                            "sub_issue_ids": [],
                            "sub_risk_ids": []
                        }
                    ],
                    "risks": [],
                    "notes": []
                }
            ],
            "contracts": [],
            "contract_vehicles": [],
            "facility_groups": [
                {
                    "id": 56,
                    "name": "VA Great Lakes Health Care System",
                    "created_at": "2020-02-26T15:12:50.000-05:00",
                    "updated_at": "2023-09-07T16:01:11.000-04:00",
                    "code": "VISN 12",
                    "status": "inactive",
                    "region_type": 0,
                    "center": null,
                    "project_id": null,
                    "progress": 2,
                    "is_portfolio": true,
                    "user_id": null,
                    "owner_id": null,
                    "owner_type": null,
                    "is_default": false,
                    "facilities": [],
                    "project_ids": [
                        3
                    ],
                    "contracts": [],
                    "contract_project_ids": [],
                    "contract_vehicles": [],
                    "contract_vehicle_ids": []
                }
            ],
            "statuses": [
                {
                    "id": 4,
                    "name": "Not Started",
                    "color": "#000000"
                }
            ],
            "task_types": [
                {
                    "id": 1,
                    "name": "Software Installation",
                    "created_at": "2020-02-27T14:44:22.000-05:00",
                    "updated_at": "2021-03-18T15:06:04.000-04:00",
                    "progress": 26
                }
            ],
            "issue_types": [
                {
                    "id": 2,
                    "name": "Issue type 1",
                    "created_at": "2020-06-10T12:31:52.000-04:00",
                    "updated_at": "2021-08-23T13:00:03.000-04:00"
                }
            ],
            "issue_severities": [
                {
                    "id": 2,
                    "name": "low severity",
                    "created_at": "2020-06-10T12:32:08.000-04:00",
                    "updated_at": "2020-11-30T15:22:05.000-05:00"
                }
            ],
            "task_stages": [
                {
                    "id": 2,
                    "name": "Not Started",
                    "created_at": "2020-11-19T09:02:14.000-05:00",
                    "updated_at": "2020-11-19T09:02:14.000-05:00",
                    "percentage": 0
                }
            ],
            "issue_stages": [
                {
                    "id": 2,
                    "name": "Not Started",
                    "created_at": "2020-11-19T09:03:06.000-05:00",
                    "updated_at": "2020-11-19T09:03:06.000-05:00",
                    "percentage": 0
                }
            ],
            "risk_stages": [
                {
                    "id": 1,
                    "name": "Not Started",
                    "percentage": 0,
                    "created_at": "2020-12-31T09:45:29.000-05:00",
                    "updated_at": "2020-12-31T09:45:29.000-05:00"
                }
            ],
            "lesson_stages": [
                {
                    "id": 1,
                    "name": "Identify",
                    "created_at": "2021-05-04T15:09:27.604-04:00",
                    "updated_at": "2021-06-24T15:18:01.251-04:00"
                }
            ],
            "contract_types": [
                {
                    "id": 1,
                    "name": "contracttype1",
                    "created_at": "2022-06-13T15:40:57.290-04:00",
                    "updated_at": "2022-06-13T15:40:57.290-04:00",
                    "user_id": 11
                }
            ],
            "contract_statues": [
                {
                    "id": 1,
                    "name": "8A",
                    "created_at": "2022-06-11T10:36:54.289-04:00",
                    "updated_at": "2022-06-11T10:36:54.289-04:00"
                }
            ],
            "contract_customers": [
                {
                    "id": 1,
                    "name": "customer1",
                    "created_at": "2022-06-13T15:40:57.194-04:00",
                    "updated_at": "2022-06-13T15:40:57.194-04:00",
                    "user_id": 11
                }
            ],
            "contract_vehicle_numbers": [
                {
                    "id": 1,
                    "name": "0353-21-2545",
                    "created_at": "2022-06-11T10:36:54.443-04:00",
                    "updated_at": "2022-06-11T10:36:54.443-04:00"
                },
                {
                    "id": 2,
                    "name": "19AQMM19D0147",
                    "created_at": "2022-06-11T10:36:54.453-04:00",
                    "updated_at": "2022-06-11T10:36:54.453-04:00"
                }
            ],
            "subcontract_numbers": [
                {
                    "id": 1,
                    "name": "2016-004-T4NG-SC/POVAT4NG-016-006",
                    "created_at": "2022-06-11T10:36:55.023-04:00",
                    "updated_at": "2022-06-11T10:36:55.023-04:00"
                },
                {
                    "id": 2,
                    "name": "2016-004-T4NG-SC/PO-T4NG-037-002",
                    "created_at": "2022-06-11T10:36:55.032-04:00",
                    "updated_at": "2022-06-11T10:36:55.032-04:00"
                },
                {
                    "id": 3,
                    "name": "2017-006-T4NG-SC/POVAT4NG-012-003",
                    "created_at": "2022-06-11T10:36:55.040-04:00",
                    "updated_at": "2022-06-11T10:36:55.040-04:00"
                },
                {
                    "id": 4,
                    "name": "2018-001-DIA-SC/DIA-008-002",
                    "created_at": "2022-06-11T10:36:55.050-04:00",
                    "updated_at": "2022-06-11T10:36:55.050-04:00"
                }
            ],
            "contract_primes": [
                {
                    "id": 1,
                    "name": "3M",
                    "created_at": "2022-06-11T10:36:55.390-04:00",
                    "updated_at": "2022-06-11T10:36:55.390-04:00"
                },
                {
                    "id": 2,
                    "name": "American Systems Cooperation",
                    "created_at": "2022-06-11T10:36:55.399-04:00",
                    "updated_at": "2022-06-11T10:36:55.399-04:00"
                },
                {
                    "id": 3,
                    "name": "AstraFine JV LLC",
                    "created_at": "2022-06-11T10:36:55.409-04:00",
                    "updated_at": "2022-06-11T10:36:55.409-04:00"
                }
            ],
            "contract_current_pops": [
                {
                    "id": 1,
                    "name": "cpop1",
                    "created_at": "2022-06-13T15:40:57.307-04:00",
                    "updated_at": "2022-06-13T15:40:57.307-04:00",
                    "user_id": 11
                },
                {
                    "id": 2,
                    "name": "current pops",
                    "created_at": "2022-06-14T15:20:53.681-04:00",
                    "updated_at": "2022-06-14T15:20:53.681-04:00",
                    "user_id": 11
                }
            ],
            "contract_classifications": [
                {
                    "id": 1,
                    "name": "FFP",
                    "created_at": "2022-06-11T10:36:55.525-04:00",
                    "updated_at": "2022-06-11T10:36:55.525-04:00"
                }
            ]
        }
    })
})

app.listen(process.env.PORT || 8081)