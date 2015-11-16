// sayfa yüklendiğinde çalış
(function($){
	// iletişim bilgileri
	var contacts = [
	// isim, adres, telefon, email, tür
		{name:"Emre Köklü", address: "Mevlana GOP", phone: "+90 541 205 1993", email: "kklemre@gmail.com", type: "aile"},
		{name:"Ilgın Köklü", address: "Almanya", phone: "+90 541 205 1994", email: "ilginkoklu@gmail.com", type: "aile"},
		{name:"Ozan Seçer", address: "Kartal", phone: "+90 541 205 1995", email: "ozansecer@gmail.com", type: "is"},
		{name:"Mustafa Dal", address: "Z.burnu", phone: "+90 541 205 1996", email: "mustafadal@gmail.com", type: "is"},
		{name:"Özay akbaş", address: "İmar Blokları", phone: "+90 541 205 1997", email: "ozayakbas@gmail.com", type: "semt"}
	];

// iletisim bilgisi için iletisim modeli oluşturuldu
var Contact = Backbone.Model.extend({
	// varsayılan özellikleri belirtildi
	defaults: {
		// foto özelliği atandı
		photo: "http://www.radyotrafik.com/Images/avatar.png"
	}
});

// yeni bir collection oluşturuldu
var Directory = Backbone.Collection.extend({
	// collection'a ait olan model belirtildi
	model: Contact
});
// yeni view oluşturuldu
var ContactView = Backbone.View.extend({
	// html etiket belirlendi
	tagName: "article",
	// oluşturulacak html'in class'ı belirlendi
	className : "contact-container",
	// tema belirlendi
	template : $("#contactTemplate").html(),
	// render fonksiyonu oluşturuldu
	render: function(){
		// underscore teması oluşturuldu
		var tmpl = _.template(this.template);
		// tema HTML'e uygun şekilde çevrildi
		this.$el.html(tmpl(this.model.toJSON()));
		return this;
	}
});

// collection view oluşturuldu
var DirectoryView = Backbone.View.extend({
	// nereye basacağımız belirlendi
    el: $("#contacts"),
 	// render çalıştırma işlemi ile yukarda oluşturduğumuz objeler tanımlandı
    initialize: function () {
        this.collection = new Directory(contacts);
        this.render();
    },
 
    render: function () {
        var that = this;
        _.each(this.collection.models, function (item) {
            that.renderContact(item);
        }, this);
    },
 
    renderContact: function (item) {
        var contactView = new ContactView({
            model: item
        });
        this.$el.append(contactView.render().el);
    }
});
var directory = new DirectoryView();


}(jQuery));
