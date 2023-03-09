export class Timer {
    constructor() {
        this.isRunning = false;
        this.startTime = 0;
        this.elapsedTime = 0;
    }

    getTimeElapsedSinceLastStart() {
        if (!this.startTime) {
            return 0;
        }

        return Date.now() - this.startTime;
    }

    start() {
        if (this.isRunning) {
            return;
        }

        this.isRunning = true;
        this.startTime = Date.now();
    }

    stop() {
        if (!this.isRunning) {
            return;
        }

        this.isRunning = false;
        this.elapsedTime = this.elapsedTime + this.getTimeElapsedSinceLastStart();
    }

    reset() {
        this.elapsedTime = 0;
        if (this.isRunning) {
            this.startTime = Date.now();
            return;
        }

        this.startTime = 0;
    }

    getTime() {
        if (!this.startTime) {
            return 0;
        }

        if (this.isRunning) {
            return this.elapsedTime + this.getTimeElapsedSinceLastStart();
        }

        return this.elapsedTime;
    }
}