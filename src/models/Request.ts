class Request {
    requestId: number;
    date : Date;
    status: string;
    userId: number;
    missionId: number;

    constructor(requestId: number, date: Date, status: string, userId: number, missionId: number) {
        this.requestId = requestId;
        this.date = date;
        this.status = status;
        this.userId = userId;
        this.missionId = missionId;
    }
}

export default Request;