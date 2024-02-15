class Mission {
    missionId: number;
    request: number;
    reward: number;
    status: boolean;

    constructor(missionId: number, request: number, reward: number, status: boolean) {
        this.missionId = missionId;
        this.request = request;
        this.reward = reward;
        this.status = status;
    }
}

export default Mission;