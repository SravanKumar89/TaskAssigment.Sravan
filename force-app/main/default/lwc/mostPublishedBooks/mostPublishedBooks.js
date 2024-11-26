import { LightningElement, track } from 'lwc';
import {
    subscribe,
    unsubscribe,
    onError,
    setDebugFlag,
    isEmpEnabled,
} from 'lightning/empApi';
export default class MostPublishedBooks extends LightningElement {
    channelName = '/event/MostPublishedBooks__e';
    isSubscribeDisabled = false;
    isUnsubscribeDisabled = !this.isSubscribeDisabled;
    subscription = {};
    payload;
    message;
    @track books = [];
    booksNotMetCriteria = [];
    handleChannelName(event) {
        this.channelName = event.target.value;
    }
    connectedCallback() {
        this.registerErrorListener();
    }
    handleSubscribe() {
        const messageCallback = (response) => {
            this.message = JSON.parse(response.data.payload.BookName__c);
            this.books = []; // Clear the existing books array before adding new books
            this.message.map(item => {
                item.Books.map(itm => {
                    if (itm.Edition > 600000) {
                        this.books.push({
                            'Publisher': item.Publisher,
                            'Author': itm.Author,
                            'Title': itm.Title,
                            'Edition': itm.Edition
                        });
                    }
                });
            });
            // Sort the books array by Edition in descending order
            this.books = this.books.sort((a, b) => b.Edition - a.Edition);
            console.log('Sorted Books: ', this.books);
        };
        subscribe(this.channelName, -1, messageCallback).then((response) => {
            console.log('Subscription request sent to: ', JSON.stringify(response.channel));
            this.subscription = response;
            this.toggleSubscribeButton(true);
        });
    }
    handleUnsubscribe() {
        this.toggleSubscribeButton(false);
        unsubscribe(this.subscription, (response) => {
            console.log('unsubscribe() response: ', JSON.stringify(response));
        });
    }
    toggleSubscribeButton(enableSubscribe) {
        this.isSubscribeDisabled = enableSubscribe;
        this.isUnsubscribeDisabled = !enableSubscribe;
    }
    registerErrorListener() {
        onError((error) => {
            console.log('Received error from server: ', JSON.stringify(error));
        });
    }
}






