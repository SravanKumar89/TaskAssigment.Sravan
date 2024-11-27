global class MostPublishedBooksScheduler implements Schedulable {
    global void execute(SchedulableContext SC) {
        MostPublishedBooks.MostPublishedBooksMethod();
    }    
}