import React from "react";
import Trade from '../../assets/frontend/images/posts/1.jpg';
import Pay from '../../assets/frontend/images/posts/2.jpg';
import Inspection from '../../assets/frontend/images/posts/3.jpg';
import Ocean from '../../assets/frontend/images/posts/4.jpg';
class Serviecs extends React.Component {
    render() {
        return (
            <section className="padding-bottom">

                <header className="section-heading heading-line">
                    <h4 className="title-section text-uppercase">Cam kết</h4>
                </header>

                <div className="row">
                    <div className="col-md-3 col-sm-6">
                        <article className="card card-post">
                            <img src={Trade} className="card-img-top" alt='null' />
                            <div className="card-body">
                                <h6 className="title text-uppercase" style={{}}>Tư Vấn</h6>
                                <p className="small text-uppercase text-muted">Nhiệt Tình, Tận Tâm</p>

                            </div>
                        </article>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <article className="card card-post">
                            <img src={Pay} className="card-img-top" alt='null' />
                            <div className="card-body">
                                <h6 className="title text-uppercase" style={{}}>Chất Lượng</h6>
                                <p className="small text-uppercase text-muted">Đảm bảo chính hãng</p>
                            </div>
                        </article>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <article className="card card-post">
                            <img src={Inspection} className="card-img-top" alt='null' />
                            <div className="card-body">
                                <h6 className="title text-uppercase">Kiểm tra</h6>
                                <p className="small text-uppercase text-muted">Dễ dàng kiểm tra</p>
                            </div>
                        </article>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <article className="card card-post">
                            <img src={Ocean} className="card-img-top" alt='null' />
                            <div className="card-body">
                                <h6 className="title text-uppercase">Vận chuyển</h6>
                                <p className="small text-uppercase text-muted">Một món cũng miễn phí</p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        );
    }
}
export default Serviecs;