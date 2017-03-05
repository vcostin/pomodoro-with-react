class PubSub {
  constructor() {
    this.topics = {};
    this.lastUid = -1;
  }

  publish(topic, data) {
    if (!Object.prototype.hasOwnProperty.call(this.topics, topic)) {
      return false;
    }

    const notify = () => {
      const throwException = (e) => {
        throw e;
      };

      this.topics[topic].forEach((subscriber) => {
        try {
          subscriber.func(topic, data);
        } catch (e) {
          setTimeout(throwException(e), 0);
        }
      });
    };

    setTimeout(notify, 0);

    return true;
  }

  /**
  *  Subscribes the passed function to the passed topic.
  *  Every returned token is unique and should be stored if you need to unsubscribe
  *  @topic (String): The topic to subscribe to
  *  @func (Function): The function to call when a new topic is published
  **/
  subscribe(topic, func) {
    // topic is not registered yet
    if (!Object.prototype.hasOwnProperty.call(this.topics, topic)) {
      this.topics[topic] = [];
    }
    const token = (this.lastUid += 1).toString();
    this.topics[topic].push({ token, func });
    // return token for unsubscribing
    return token;
  }

  /**
   *  Unsubscribes a specific subscriber from a specific topic using the unique token
   *  @token (String): The token of the function to unsubscribe
   **/
  unsubscribe(token) {
    for (const m in this.topics) {
      if (Object.prototype.hasOwnProperty.call(this.topics, m)) {
        for (let i = 0, j = this.topics[m].length; i < j; i += 1) {
          if (this.topics[m][i].token === token) {
            this.topics[m].splice(i, 1);

            return token;
          }
        }
      }
    }

    return false;
  }

}

export default new PubSub();
