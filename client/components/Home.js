import React from 'react';

export default function Home (){
        return (
            <div>
              {/* <h1> VocabuMemory </h1>
              <h3> Practice you vocabulary skills with this memory matching game</h3> */}
              <div className="component">
				<ul className="align">
					<li>
						<figure className="book">
							{/* <!-- Front --> */}
							<ul className="hardcover_front">
								<li>
									<div className="coverDesign blue">
										<h1>Vocabu-
                      Memory</h1>
										<p>*</p>
									</div>
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
								<p> By Evlis Henry</p>
							</figcaption>
						</figure>
					</li>
				</ul>
			</div>

              </div>
        )
}
