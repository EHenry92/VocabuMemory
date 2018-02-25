import React from 'react';

export default function Home (){
        return (
            <div>
              <div className="component">
				<ul className="align">
					<li>
						<figure className="book">
							{/* <!-- Front --> */}
							<ul className="hardcover_front">
								<li className="coverDesign blue">
										<h1>Vocabu-
                      Memory</h1>
                      <p> By Evlis Henry</p>
								</li>
								<li />
							</ul>
							{/* <!-- Pages --> */}
							<ul className="page">
								<li />
								<li>
									<a className="btn" href="/game">Start</a>
								</li>
								<li />
								<li />
								<li />
							</ul>
							{/* <!-- Back --> */}
							<ul className="hardcover_back">
								<li />
								<li />
							</ul>
							<ul className="book_spine">
								<li />
								<li />
							</ul>
							<figcaption>
								<h1>Stretch your memory muscles while reviewing your vocabulary.</h1>
								<span />
								{/* <p> By Evlis Henry</p> */}
							</figcaption>
						</figure>
					</li>
				</ul>
			</div>

              </div>
        )
}
