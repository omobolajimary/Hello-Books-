const Books = require('../models/book');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app.js');

const should = chai.should();

chai.use(chaiHttp);



describe('Books', () => {
  describe('/POST/api/v1/books', () => {
it('it should post a book when none of the fields is empty', (done) => {
      const item = {
        bookName: 'vehicula risus. Nulla eget metus',
        author: 'Shelley Foreman',
        bookStatus: 'available',
      };
        chai.request(app)
            .post('/api/v1/books')
            .send(item)
            .end((err, res) => {
                res.should.have.status(200);
              done();
            
      });
     });

it('it should not post if status is empty', (done) => {
      const item = {
        bookName: 'vehicula risus. Nulla eget metus',
        author: 'Shelley Foreman',
        bookStatus: ' ',
      };
      chai.request(app)
        .post('/api/v1/books')
        .send(item)
        .end((err, res) => {
          res.should.have.status(500);
          done();
            
      });
     });
 
it('it should not post if book name is a number', (done) => {
      const item = {
        bookName: 1,
        author: 'Shelley Foreman',
        bookStatus: 'available',
      };
      chai.request(app)
        .post('/api/v1/books')
        .send(item)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  
 
it('it should put a book when all input supplied correctly', (done) => {
      const item = {
        bookId:'1',
        bookName: 'vehicula risus. Nulla eget metus',
        author: 'Shelley Foreman',
        bookStatus: 'available',
        upvote:'13'
      };
        
      chai.request(app)
        .put('/api/v1/books/:bookId')
        .send({ item })
        .end((err, res) => {
          res.should.have.status(201);
              done();
            
      });
     });

it('it should GET all the books', (done) => {
        chai.request(app)
            .get('/api/v1/books')
            .end((err, res) => {
                res.should.have.status(200);

              done();
            });
      });

it('it should not post book currently unavailable to borrow', (done) => {
        let item = {
            bookName: 'vehicula risus. Nulla eget metus',
        author: 'Shelley Foreman',
        bookStatus: 'unavailable',
        };
        chai.request(app)
            .post('/api/v1/user/:userId/borrow/:bookId')
            .send(item)
            .end((err, res) => {
                res.should.have.status(404);
              done();
            
      });
     });
 
//  it('it should post approve to borrow if book available', (done) => {
//         let item = {
//           userId: '1',
//              bookName: 'vehicula risus. Nulla eget metus',
//         author: 'Shelley Foreman',
//         bookStatus: 'available',
//         };
//         chai.request(app)
//             .put('/api/v1/users/:userId/borrow/:bookId')
//             .send(item)
//             .end((err, res) => {
//                 res.should.have.status(200);
//               done();
            
//       });
//      });
    });
  
  after(() => {
           process.exit(0)
         });
})