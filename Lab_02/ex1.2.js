const dayjs = require('dayjs');
let date = dayjs();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('Lab_02/films.db' , err=> {if (err) throw err});



function Film (id,title,favorites=false,date=undefined,rating=undefined){
    this.id=id;
    this.title=title;
    this.favorites=favorites;
    this.date=dayjs(date).format('DD/MMM/YYYY');
    this.rating=rating;
}


function FilmList (){
    this.list=[];

    this.addNewFilm = (f) => {
        this.list.push(f);
        //console.log(f);
    }

    this.sortByDate = () => {
        const new_array=[...this.list]
        new_array.sort( (a,b) => {
            const date1=dayjs(a.date);
            const date2=dayjs(b.date);
            return date1.diff(date2);
        });

        console.log("-----------------------------");
        for (i of new_array){
            console.log(i.title + " " +i.date);
        }
        console.log("-----------------------------");

        return new_array;
    }

    this.print=()=>{
        console.log("-----------------------------");
        for (i of this.list){
            console.log(i.title + " " +i.date);
        }
        console.log("-----------------------------");
    }

    this.allFilms  = async() => {
        return new Promise( (resolve,reject)=>{
            db.all('SELECT * FROM films', (err,rows)=>{
                if(err) reject(err)
                else {
                    const ListOfFilm = new FilmList();
                    for (let x of rows){
                        let f1;
                        if(x["watchdate"]==null){
                           f1 = new Film (x["id"],x["title"],x["favorite"], "Jan 1 1970", x["rating"]);
                        }else{
                           f1 = new Film (x["id"],x["title"],x["favorite"], x["watchdate"], x["rating"]);
                        }
                        ListOfFilm.addNewFilm(f1);
                    }
                    resolve(ListOfFilm);
                }
            });
        });
    }

    this.favFilms = async() =>{
        return new Promise( (resolve,reject)=>{
            db.all('SELECT * FROM films WHERE favorite=TRUE', (err,rows)=>{
                if(err) reject(err);
                else {
                    const ListOfFilm = new FilmList();
                    for (let x of rows){
                        let f1;
                        if(x["watchdate"]==null){
                           f1 = new Film (x["id"],x["title"],x["favorite"], "Jan 1 1970", x["rating"]);
                        }else{
                           f1 = new Film (x["id"],x["title"],x["favorite"], x["watchdate"], x["rating"]);
                        }
                        ListOfFilm.addNewFilm(f1);
                    }
                    resolve(ListOfFilm);
                }
            })
        })
    }

    this.watchedToday = async() =>{
        return new Promise( (resolve,reject) => {
            const today=dayjs().format('YYYY-MM-DD');
            db.all('SELECT * FROM films WHERE watchdate= ?', today, (err,rows)=>{
                if(err) reject(err);
                else {
                    const ListOfFilm = new FilmList();
                    for (let x of rows){
                        let f1;
                        if(x["watchdate"]==null){
                           f1 = new Film (x["id"],x["title"],x["favorite"], "Jan 1 1970", x["rating"]);
                        }else{
                           f1 = new Film (x["id"],x["title"],x["favorite"], x["watchdate"], x["rating"]);
                        }
                        ListOfFilm.addNewFilm(f1);
                    }
                    resolve(ListOfFilm);
                }
            })
        })
    }

    this.watchDate = async(date) =>{
        return new Promise( (resolve,reject)=>{
            const data=dayjs(date).format('YYYY-MM-DD');
            db.all('SELECT * FROM films WHERE watchdate= ?', data, (err,rows)=>{
                if(err) reject(err);
                else {
                    const ListOfFilm = new FilmList();
                    for (let x of rows){
                        let f1;
                        if(x["watchdate"]==null){
                           f1 = new Film (x["id"],x["title"],x["favorite"], "Jan 1 1970", x["rating"]);
                        }else{
                           f1 = new Film (x["id"],x["title"],x["favorite"], x["watchdate"], x["rating"]);
                        }
                        ListOfFilm.addNewFilm(f1);
                    }
                    resolve(ListOfFilm);
                }
            })
        })
    }

    this.filmRate = async(rating)=>{
        return new Promise ((resolve,reject)=>{
            db.all('SELECT * FROM films WHERE rating > ?',rating, (err,rows)=>{
                if(err) reject(err);
                else {
                    const ListOfFilm = new FilmList();
                    for (let x of rows){
                        let f1;
                        if(x["watchdate"]==null){
                           f1 = new Film (x["id"],x["title"],x["favorite"], "Jan 1 1970", x["rating"]);
                        }else{
                           f1 = new Film (x["id"],x["title"],x["favorite"], x["watchdate"], x["rating"]);
                        }
                        ListOfFilm.addNewFilm(f1);
                    }
                    resolve(ListOfFilm);
                }
            })
        })
    }

    this.filmName = async(name) =>{
        return new Promise((resolve,reject)=>{
            db.all('SELECT * FROM films WHERE title = ?',name, (err,rows)=>{
                if(err) reject(err);
                else {
                    const ListOfFilm = new FilmList();
                    for (let x of rows){
                        let f1;
                        if(x["watchdate"]==null){
                           f1 = new Film (x["id"],x["title"],x["favorite"], "Jan 1 1970", x["rating"]);
                        }else{
                           f1 = new Film (x["id"],x["title"],x["favorite"], x["watchdate"], x["rating"]);
                        }
                        ListOfFilm.addNewFilm(f1);
                    }
                    resolve(ListOfFilm);
                }
            })
        })
    }

    this.insertFilm = async(film) =>{
        return new Promise ((resolve,reject)=>{
            title=film.title;
            data=dayjs(film.date).format('YYYY-MM-DD');
            rate=film.rating;
            db.run('INSERT INTO films (title,watchdate,rating) VALUES(?,?,?)',title,data,rate,(err)=>{
                    if(err) reject(err);
                    else resolve('Done')
            })
        })
    }

    this.deleteFilm = async(filmid)=>{
        return new Promise ((resolve,reject)=>{
            db.run('DELETE FROM films WHERE id = ? ',filmid,(err)=>{
                    if(err) reject(err);
                    else resolve('Cancellation Done')
            })
        })
    }

    this.deleteDateFilm = async(filmdate)=>{
        return new Promise ((resolve,reject)=>{
            data=dayjs(filmdate).format('YYYY-MM-DD');
            db.run('DELETE FROM films WHERE watchdate = ? ',data,(err)=>{
                    if(err) reject(err);
                    else resolve('Cancellation Done')
            })
        })
    }

}


async function main (){
    const ListOfFilm = new FilmList();
    const f1 = new Film (1,"Avengers",true,"March 15 2022",5);
    await ListOfFilm.watchDate("2022/03/11").then((list)=> {list.print()});
    await ListOfFilm.filmName("Star Wars").then((list)=>{list.print()});
    await ListOfFilm.insertFilm(f1).then(console.log);
    await ListOfFilm.deleteFilm(7).then(console.log);
    await ListOfFilm.deleteDateFilm("2022/03/15").then(console.log);;
    return "Tutto Ok";
}


main().then((x)=>{db.close(); console.log});