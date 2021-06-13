import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Serie } from '../models/serie.model';
import { Painting } from '../models/painting.model';
import { SerieService } from '../services/serie.service';
import { SeriePreviewService } from '../services/serie-preview.service';
import { PaintingService } from '../services/painting.service';
import { PaintingPreviewService } from '../services/painting-preview.service';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-admin-paintings',
  templateUrl: './admin-paintings.component.html',
  styleUrls: ['./admin-paintings.component.css'],
  providers: [SerieService, SeriePreviewService, PaintingService, PaintingPreviewService]
})
export class AdminPaintingsComponent implements OnInit {

  selectedIdSerie: Number;
  selectedPainting: Painting;
  selectedPaintingAux: Painting;

  public username: string;
  public password: string;
  public isAdmin: boolean;
  public mostrarError: boolean;
  public series:any = [];
  public seriesPreview:any = [];
  public paintings:any = [];
  public paintingsPreview:any = [];
  public token: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _serieService: SerieService,
    private _seriePreviewService: SeriePreviewService,
    private _paintingService: PaintingService,
    private _paintingPreviewService: PaintingPreviewService,
    private _userService: UserService,
    private spinner: NgxSpinnerService
  ) {
    this.username = '';
    this.password = '';
    this.isAdmin = false;
    this.mostrarError = false;
  }

  ngOnInit() {
    console.log('admin-paintings.component.ts cargado');

    this.checkToken()      
  }

  checkToken() {
    let result: boolean;

    this.token = this._userService.getToken();
    
    //console.log(this.token);

    result = this.token != undefined && this.token != '';


    if (result == true)
    {
      this.isAdmin = true;
    }
    else if (result == false)
    {
      this.deleteAllSeriesAndPaintingsPreviewInit();
    }
          
  }

  
  deleteAllSeriesAndPaintingsPreviewInit() {
    this.deleteAllSeriesPreviewInit();    
  }

  deleteAllSeriesPreviewInit(){
    this._seriePreviewService.deleteAllSeries().subscribe(
      result => {
        //console.log(result);

        this.deleteAllPaintingsPreviewInit();
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  

  deleteAllPaintingsPreviewInit(){
    this._paintingPreviewService.deleteAllPaintings().subscribe(
      result => {
        //console.log(result);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  processSelectedIdSerie(idSerie: Number) {
    this.selectedIdSerie = idSerie;
  }

  processSelectedPainting(painting: Painting){
    this.selectedPainting = painting;
  }

  processSelectedPaintingAux(painting: Painting){
    this.selectedPaintingAux = painting;
  }

  onSessionClose() {
    this._userService.deleteToken();
  }

  onSubmit(){

    this.spinner.show();
     if (this.username == 'lgmateu' && this.password == 'mocito_bueno%37'){

      this.updateContentImagePreview();

      setTimeout (() => {
         console.log("Hello from setTimeout");
         this.loginButtonComplete();
      }, 1000);   

     } else {
        this.mostrarError = true;
     }

  }


  updateContentImagePreview(){
    this._paintingPreviewService.updateDirectoryImages().subscribe(
      result => {
      
      },
      error => {
        console.log(<any>error);
      }
    );
  }


  loginButtonComplete(){
    this._serieService.getSeries().subscribe(
      result => {
        //console.log(result);

        this.series = result;
        this.cloneSeriesCompleteLogin();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  cloneSeriesCompleteLogin(){
    for (var serieAux of this.series){
      this._serieService.copySerie(serieAux['idSerie'], serieAux).subscribe(
      result => {
        //console.log(result);
        //console.log('Serie copied correctly!');
      },
      error => {
        console.log(<any>error);
      }
    );
    }

    this.selectPaintingsToClonePaintingsCompleteLogin();
  }

  
  selectPaintingsToClonePaintingsCompleteLogin(){
    this._paintingService.getPaintings().subscribe(
      result => {
        //console.log(result);

        this.paintings = result;
        this.clonePaintingsCompleteLogin();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  clonePaintingsCompleteLogin(){
    for (var paintingAux of this.paintings){
      this._paintingService.copyPainting(paintingAux['idPainting'], paintingAux).subscribe(
      result => {
        //console.log(result);
        //console.log('Painting copied correctly!');
      },
      error => {
        console.log(<any>error);
      }
    );
    }

    this.login();
  }

  login() {
    if (this.isAdmin == false){

      this.saveToken();
      this.isAdmin = true;

    }
    this.spinner.hide();
  }

  saveToken(){
    const user = {username: this.username, email: '', password: this.password};
      this._userService.loginUser(user).subscribe( data => {
        //console.log(data);
        this._userService.setToken(data.accessToken);

        this.isAdmin = true;
      });
  }

  
  onAcceptChanges(){
    //console.log('onAcceptChanges');

    this.spinner.show();

    this.updateContentImage();

    setTimeout (() => {
       console.log("Hello from setTimeout");
       this.acceptButtonComplete();
    }, 1000);

  }

  updateContentImage(){
    this._paintingService.updateDirectoryImages().subscribe(
      result => {
      },
      error => {
        console.log(<any>error);
      }
    );
  }


  onCancelChanges(){
      //console.log('onCancelChanges');

      this.spinner.show();

      //pantalla de confirmación de cancelar cambios

      this.updateContentImagePreview();

      setTimeout (() => {
         console.log("Hello from setTimeout");
         this.cancelButtonComplete();
      }, 1000);

  }


  cancelButtonComplete(){
    this._seriePreviewService.getSeries().subscribe(
      result => {
        //console.log(result);

        this.series = result;

        this.deleteAllSeriesPreviewCancel();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteAllSeriesPreviewCancel(){
    for (var serieAux of this.series){
      this._seriePreviewService.deleteSerie(serieAux['idSerie']).subscribe(
      result => {
        //console.log(result);
        //console.log('Serie deleted correctly!');
      },
      error => {
        console.log(<any>error);
      }
    );
    }

    this.selectPaintingsToDeleteAllPaintingsPreviewCancel();
  }
  

  selectPaintingsToDeleteAllPaintingsPreviewCancel(){
    this._paintingPreviewService.getPaintings().subscribe(
      result => {
        //console.log(result);

        this.paintings = result;

        this.deleteAllPaintingsPreviewCancel();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteAllPaintingsPreviewCancel(){
    for (var paintingAux of this.paintings){
      this._paintingPreviewService.deletePainting(paintingAux['idPainting']).subscribe(
      result => {
        //console.log(result);
        //console.log('Painting deleted correctly!');
      },
      error => {
        console.log(<any>error);
      }
    );
    }

    this.isAdmin = false;
    this.loginButtonComplete();
  }
 


  acceptButtonComplete(){
    this.getSeriesPreviewAccept();
  }

  getSeriesPreviewAccept() : any{
    this._seriePreviewService.getSeries().subscribe(
      result => {
        this.seriesPreview = result;

        this.getPaintingsPreviewAccept();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getPaintingsPreviewAccept(){
    this._paintingPreviewService.getPaintings().subscribe(
      result => {
        //console.log(result);

        this.paintingsPreview = result;

        this.selectToDeleteAllSeriesAccept();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  selectToDeleteAllSeriesAccept(){
    this._serieService.getSeries().subscribe(
      result => {
        this.series = result;

        this.deleteAllSeriesAccept();
      },
      error => {
        console.log(<any>error);
      }
    );

  }

  deleteAllSeriesAccept(){
    for (var serieAux of this.series){
      this._serieService.deleteSerie(serieAux['idSerie']).subscribe(
      result => {
        //console.log(result);
        //console.log('Serie deleted correctly!');
      },
      error => {
        console.log(<any>error);
      }
    );
    }

    this.selectToDeleteAllPaintingsAccept();
  }

  selectToDeleteAllPaintingsAccept(){
    this._paintingService.getPaintings().subscribe(
      result => {
        //console.log(result);

        this.paintings = result;

        this.deleteAllPaintingsAccept();
      },
      error => {
        console.log(<any>error);
      }
    );

  }

  deleteAllPaintingsAccept(){
    for (var paintingAux of this.paintings){
      this._paintingService.deletePainting(paintingAux['idPainting']).subscribe(
      result => {
        //console.log(result);
        //console.log('Painting deleted correctly!');
      },
      error => {
        console.log(<any>error);
      }
    );
    }

    this.cloneSeriesPreviewCompleteAccept();
  }

  cloneSeriesPreviewCompleteAccept(){
    for (var serieAux of this.seriesPreview){
      this._seriePreviewService.copySerie(serieAux['idSerie'], serieAux).subscribe(
      result => {
        //console.log(result);
        //console.log('Serie copied correctly!');
      },
      error => {
        console.log(<any>error);
      }
    );
    }

    this.clonePaintingsPreviewCompleteAccept();
  }

  clonePaintingsPreviewCompleteAccept(){
    for (var paintingAux of this.paintingsPreview){
      this._paintingPreviewService.copyPainting(paintingAux['idPainting'], paintingAux).subscribe(
      result => {
        //console.log(result);
        //console.log('Painting copied correctly!');
      },
      error => {
        console.log(<any>error);
      }
    );
    }

    this.deleteAllSeriesPreviewAccept();
  }

  deleteAllSeriesPreviewAccept(){
    for (var serieAux of this.seriesPreview){
      this._seriePreviewService.deleteSerie(serieAux['idSerie']).subscribe(
      result => {
        //console.log(result);
        //console.log('Serie deleted correctly!');
      },
      error => {
        console.log(<any>error);
      }
    );
    }

    this.deleteAllPaintingsPreviewAccept();
  }
  

  deleteAllPaintingsPreviewAccept(){
    for (var paintingAux of this.paintingsPreview){
      this._paintingPreviewService.deletePainting(paintingAux['idPainting']).subscribe(
      result => {
        //console.log(result);
        //console.log('Painting deleted correctly!');
      },
      error => {
        console.log(<any>error);
      }
    );
    }

    this.deleteSerieNotinPreview();   
  }

  deleteSerieNotinPreview(){
    let exist: boolean;
    for (var serieAux of this.series){
      exist = false;
      for (var seriePreviewAux of this.seriesPreview){

        if (serieAux['idSerie']==seriePreviewAux['idSerie'])
        {
          exist = true;
          break;
        }
      }

      if (exist == false){
        this._serieService.deleteSerie(serieAux['idSerie']).subscribe(
          result => {
            //console.log(result);
            //console.log('Serie deleted correctly!');
          },
          error => {
            console.log(<any>error);
          }
        );
      }
    }

    this.deletePaintingNotinPreview();
  }

  deletePaintingNotinPreview(){
    let exist: boolean;
    for (var paintingAux of this.paintings){
      exist = false;
      for (var paintingPreviewAux of this.paintingsPreview){

        if (paintingAux['idPainting']==paintingPreviewAux['idPainting'])
        {
          exist = true;
          break;
        }
      }

      if (exist == false){
        this._paintingService.deletePainting(paintingAux['idPainting']).subscribe(
          result => {
            //console.log(result);
            //console.log('Painting deleted correctly!');
          },
          error => {
            console.log(<any>error);
          }
        );
      }
    }

    this.isAdmin = false;
    this.loginButtonComplete();

  }

  openPreview(idSerie) {
    // Converts the route into a string that can be used 
    // with the window.open() function
    const url = this._router.serializeUrl(
      this._router.createUrlTree([`/app-portfolio-preview/${idSerie}`])
    );

    window.open(url, '_blank');
  }

}
