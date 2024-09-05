import Review from '../models/review.model.js'

export const getReviews = async ( req, res)=> {

    const reviews= await Review.find();
    res.json(reviews);
}
export const createReview = async ( req, res)=> {
    const {productId, userId,rating,comment}= req.body;

    const newReview = new Review({
        productId,
        userId,
        rating,
        comment,
        
    });

    const savedReview=  await newReview.save();
    res.json(savedReview);

}

export const getReview = async ( req, res)=> {

    const review= await Review.findById(req.params.id);
    if(!review) return res.status(404).json({message: 'Reseña no encontrada.'});
    res.json(review);

}
export const updateReview = async ( req, res)=> {
    const review= await Review.findByIdAndUpdate(req.params.id, req.body,{
        new:true
    });
    if(!review) return res.status(404).json({message: 'Reseña no encontrada.'});
    res.json(review);
}
export const deleteReview = async ( req, res)=> {

    const review= await Review.findByIdAndDelete(req.params.id);
    if(!review) return res.status(404).json({message: 'Reseña no encontrada.'});
    res.json(review);
}