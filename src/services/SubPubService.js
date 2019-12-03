export class SubPubService {
    listeners = {};

    sub(event, listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
        return () => this.off(event, listener);
    }

    pub(event, data = null) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(listener => listener({event, data}));
        }
    }

    off(event, listener = null) {
        if (listener) {
            if (this.listeners[event]) {
                const index = this.listeners[event].findIndex(item => item === listener);
                if (index !== -1) delete this.listeners[event][index];
            }
        } else {
            delete this.listeners[event];
        }
    }
}
