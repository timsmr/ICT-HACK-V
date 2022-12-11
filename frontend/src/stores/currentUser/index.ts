import axios from 'axios';
import { makeObservable, observable, action } from 'mobx';

class CurrentUserStore {
    userToken: string | null = null;
    userType: 'student' | 'company' | null = null;
    name: string | null = null;
    firstName: string | null = null;
    lastName: string | null = null;
    specialization: string | null = null;
    education: string | null = null;
    hardSoftSkills: string | null = null;
    projects: string | null = null;
    bio: string | null = null;
    description: string | null = null;


    constructor() {
        makeObservable(this, {
            userToken: observable,
            userType: observable,
            firstName: observable,
            lastName: observable,
            specialization: observable,
            education: observable,
            hardSoftSkills: observable,
            projects: observable,
            bio: observable,
            description: observable,
            setUserToken: action,
            setUserType: action,
            setFirstName: action,
            setLastName: action,
            setSpecialization: action,
            setEducation: action,
            setHardSoftSkills: action,
            setProjects: action,
            setBio: action,
            getData: action,
        });
    }

    setName = (value: CurrentUserStore["name"],) => {
        this.name = value;
        value && localStorage.setItem('name', value)
        value && console.log(value)
    }

    setDescription = (value: CurrentUserStore["description"],) => {
        this.description = value;
        value && localStorage.setItem('description', value)
    }

    setUserToken = (value: CurrentUserStore["userToken"],) => {
        this.userToken = value;
        value && localStorage.setItem('userToken', value)
    }

    setUserType = (value: CurrentUserStore["userType"],) => {
        this.userType = value;
        value && localStorage.setItem('userType', value)
    }

    setFirstName = (value: CurrentUserStore["userType"],) => {
        this.firstName = value;
        value && localStorage.setItem('userType', value)
    }

    setLastName = (value: CurrentUserStore["lastName"],) => {
        this.lastName = value;
        value && localStorage.setItem('lastName', value)
    }

    setSpecialization = (value: CurrentUserStore["specialization"],) => {
        this.specialization = value;
        value && localStorage.setItem('specialization', value)
    }

    setEducation = (value: CurrentUserStore["education"],) => {
        this.education = value;
        value && localStorage.setItem('education', value)
    }

    setHardSoftSkills = (value: CurrentUserStore["hardSoftSkills"],) => {
        this.hardSoftSkills = value;
        value && localStorage.setItem('hardSoftSkills', value)
    }

    setProjects = (value: CurrentUserStore["projects"],) => {
        this.projects = value;
        value && localStorage.setItem('projects', value)
    }

    setBio = (value: CurrentUserStore["bio"],) => {
        this.bio = value;
        value && localStorage.setItem('bio', value)
    }

    getData = async () => {

        if (this.userType === 'student') {
            await axios.post("/student", {
                "token": this.userToken,
            })
                .then((res) => {
                    const data = res.data.OrganizationEntity
                    this.setFirstName(data?.first_name)
                    this.setLastName(data?.last_name)
                    this.setSpecialization(data?.specialization)
                    this.setHardSoftSkills(data?.hard_soft_skills)
                    this.setEducation(data?.education)
                    this.setProjects(data?.projects)
                    this.setBio(data?.bio)
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            await axios.post("/organization", {
                "token": this.userToken,
            })
                .then((res) => {
                    const data = res.data.OrganizationEntity
                    this.setName(data?.name)
                    this.setSpecialization(data?.specialization)
                    this.setDescription(data?.description)
                })
                .catch((err) => {
                    console.log(err);
                });
            // await fetch('/organization', {
            //     method: 'GET',
            //     body: { token: this.userToken }
            // })
        }


    }

    clear = () => {
        localStorage.clear()
        this.userToken = null
        this.userType = null
        this.firstName = null
        this.lastName = null
        this.specialization = null
        this.education = null
        this.hardSoftSkills = null
        this.projects = null
        this.bio = null
    }
}

export { CurrentUserStore };