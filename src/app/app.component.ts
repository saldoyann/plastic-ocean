import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HostListener } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Idee } from './models/Idee.model';
import { IdeeService } from './services/idee.service';

import { EmbedVideoService } from 'ngx-embed-video';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'climact-projet';
  scrHeight: any;
  scrWidth: any;

  Ideeform: FormGroup;
  submitted = false;
  ValidationForm: string;
  ValidationImg: string;  

  photo: any;
  navbarOpen = false;

  iframe_html: any;
  safeURL = "https://www.youtube.com/watch?v=QbWDWxB6gSI";
  
  Idees = this.http.get<any[]>('http://localhost:4201/');
  modalService: any;



  @HostListener('window:resize', ['$event'])
  
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        return this.scrHeight;
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  onNavigate(laPersonne: any){
      var laPersonne = laPersonne.originalTarget.id;
      window.open("https://www.instagram.com/"+laPersonne, "_blank");
  }

  openExplication(Lidee: any){
    var Lidee = Lidee.originalTarget.id;
    var modal = document.getElementById("myModal"+Lidee);
    var span = document.getElementsByClassName("close")[0];
       
    modal.style.display = "block";

    console.log(Lidee);
  }

  OnCloseModal(Lidee: any){
    var Lidee = Lidee.originalTarget.id;
    var modal = document.getElementById("myModal"+Lidee);
    modal.style.display = "none";
  }

  onNavigateSrcPourcent(){
    window.open("https://fr.oceancampus.eu/cours/h3s/pollution-des-oceans-origine-des-dechets-aquatiques", "_blank");
  }

  public readCause(leBouton: any) {
    var target = leBouton.originalTarget.id;
    
    let onglet_P = document.getElementById("onglet_P");
    let onglet_H = document.getElementById("onglet_H");
    let onglet_C = document.getElementById("onglet_C");
    
    switch(target){

      case 'img_P':
        //console.log("Plaster");
        onglet_H.setAttribute("style", "display: none;");
        onglet_C.setAttribute("style", "display: none;");

        onglet_P.setAttribute("style", "display: block;");

        document.getElementById(target).setAttribute("style", "opacity: 1;");
        document.getElementById("img_H").setAttribute("style", "opacity: 0.5;");
        document.getElementById("img_C").setAttribute("style", "opacity: 0.5;");
        break;

      case 'img_H':
        //console.log("Heart");
        onglet_P.setAttribute("style", "display: none;");
        onglet_C.setAttribute("style", "display: none;");

        onglet_H.setAttribute("style", "display: block;");

        document.getElementById(target).setAttribute("style", "opacity: 1;");
        document.getElementById("img_P").setAttribute("style", "opacity: 0.5;");
        document.getElementById("img_C").setAttribute("style", "opacity: 0.5;");
        break;

      case 'img_C':
        //console.log("Clock");
        onglet_H.setAttribute("style", "display: none;");
        onglet_P.setAttribute("style", "display: none;");

        onglet_C.setAttribute("style", "display: block;");

        document.getElementById(target).setAttribute("style", "opacity: 1;");
        document.getElementById("img_H").setAttribute("style", "opacity: 0.5;");
        document.getElementById("img_P").setAttribute("style", "opacity: 0.5;");
        break;
    }
  }
  // Constructor
  constructor(private formBuilder: FormBuilder,
              private ideeService: IdeeService,
              private http: HttpClient,
              private embedService: EmbedVideoService,
              private titleService: Title, 
              private metaService: Meta) { this.iframe_html = this.embedService.embed(this.safeURL, { attr: { width: "100%", height: "100%" } });  }

  ngOnInit() {
    this.initForm();
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {name: 'keywords', content: 'Angular, Universal, Example'},
      {name: 'description', content: 'Angular Universal Example'},
      {name: 'robots', content: 'index, follow'}
    ]);
  }

  initForm() {
    this.Ideeform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      corps: ['', Validators.required],
      photo_couv: ['', Validators.required]
    })
  }
  
  get f() { return this.Ideeform.controls; }

  selectPhoto(event: any) {
    var type = event.target.files['0']['type'].split("/");

    if (event.target.files.length > 0 && event.target.files['0']['size'] < "2000000") {
      this.ValidationImg = "";
      document.getElementById("btn-submit").removeAttribute("disabled");
      const photo_idee = event.target.files[0];
      this.photo = photo_idee;
    } else {
      this.ValidationImg = "L'image est trop volumineuse, il faut que son poids soit inférieure à 2 Mo";
      document.getElementById("btn-submit").setAttribute("disabled", "true");
      this.onResetimgInput();
    }
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  onResetimgInput(){
    this.Ideeform.controls.photo_couv.reset();  
  }

  onReset() {
    this.submitted = false;
    this.Ideeform.reset();
    this.ValidationForm = 'Le formulaire a bien été envoyé, Merci !';
  }

  onSubmitForm() {
    this.submitted = true;
   const formValue = this.Ideeform.value; 
   
   const newIdee = new Idee(
      formValue['email'],
      formValue['corps'],
      this.photo);

    if (this.Ideeform.invalid) {
      return;
    }

    var fd = new FormData();

    console.log(newIdee['photo']['size']);

    fd.append('email', newIdee.email);
    fd.append('corps', newIdee.corps);
    fd.append('photo_couv', this.photo);

    this.ideeService.addIdeeToServer(fd);
    this.onReset(); 

  }  
}
