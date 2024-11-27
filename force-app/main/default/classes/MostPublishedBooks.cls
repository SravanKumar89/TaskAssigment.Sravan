public class MostPublishedBooks {
    public static void MostPublishedBooksMethod(){
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setMethod('GET');
        req.setEndpoint('https://eoheai3ashoyzos.m.pipedream.net');        
        HttpResponse resp = http.send(req); 
        System.debug(resp);
        if(resp.getStatusCode() == 200){
            Eventbus.publish(
                new MostPublishedBooks__e (
                    BookName__c = resp.getBody() 
                ));   
        }        
    }  
}