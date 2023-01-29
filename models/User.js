export class User {
    constructor(
        id,
        secretId,
        gender,
        age,
        instrument,
        timeSpentPracticing,
        education,
        timeStamp
    ) {
        this.id = id;
        this.gender = gender;
        this.age = age;
        this.instrument = instrument;
        this.timeSpentPracticing = timeSpentPracticing;
        this.education = education;
        this.secretId = secretId;
        this.timeStamp = timeStamp;
    }
}
