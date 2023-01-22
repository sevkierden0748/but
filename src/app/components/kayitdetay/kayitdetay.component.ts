import { KayitekleComponent } from './../kayitekle/kayitekle.component';
import { Kayit } from './../../models/kayit';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-kayitdetay',
  templateUrl: './kayitdetay.component.html',
  styleUrls: ['./kayitdetay.component.css']
})
export class KayitdetayComponent implements OnInit {
  key: string;
  uid: string;
  secKayit: Kayit = new Kayit();
  secilen: string;
  iletildi = [
    'Okundu',
    'Okunmadı İşaretle',
    'Cevaplandı',
  ];
  constructor(
    public route: ActivatedRoute,
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.uid = user.uid;

    this.route.params.subscribe(p => {
      this.key = p.key;
      this.KayitGetir();
    });

    this.Okundu();
  }
  KayitGetir() {
    this.fbServis.KayitByKey(this.key).snapshotChanges().subscribe(data => {
      const y = { ...data.payload.toJSON(), key: this.key };
      this.secKayit = (y as Kayit);
    });
  }

  Okundu(){


    this.fbServis.KayitDuzenle(this.secKayit).then();

    
  }


}
