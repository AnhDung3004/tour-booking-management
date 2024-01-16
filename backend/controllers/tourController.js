

import Tour from '../models/Tour.js'


//create new tour

export const createTour = async (req, res) => {
    const newTour = new Tour(req.body)

    try {
        const savedTour = await newTour.save()

        res.status(200).json({
            success:true, 
            massage:'Successfully created', 
            data:savedTour})
    } catch (error) {
        res.status(500).json({
            success:false, 
            massage:'Failed to create. Try again!'
        })
    }
}

//update tour

export const updateTour = async(req,res) => {
    
    const id = req.params.id
    
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set:req.body
        }, {new:true})

        res.status(200).json({
            success:true, massage:'Successfully updated', 
            data:updatedTour
        })
        

    } catch (error) {
        res.status(500).json({
            success:false, 
            massage:'Failed to update',
        })
    }
}

//delete tour

export const deleteTour = async(req,res) => {
    
    const id = req.params.id
    
    try {
        await Tour.findByIdAndDelete(id)

        res.status(200).json({
            success:true, 
            massage:'Successfully deleted',
        })
        

    } catch (error) {
        res.status(500).json({
            success:false, 
            massage:'Failed to delete',
        })
    }
}

//get single tour

export const getSingleTour = async(req,res) => {
    
    const id = req.params.id
    
    try {
        const tour = await Tour.findById(id)
            .populate('reviews')

        res.status(200).json({
            success:true,
            massage:'successful',
            data:tour
        })
        

    } catch (error) {
        res.status(404).json({
            success:false, 
            massage:'not found',
        })
    }
}

//get all tours

export const getAllTours = async(req,res) => {
    
    //for pagination
    const page = parseInt(req.query.page)
    
    try {
        const tours = await Tour.find({})
        .populate('reviews')
        .skip(page * 8)
        .limit(8)

        res.status(200).json({
            success:true,
            massage:'successful',
            data:tours
        })



    } catch (error) {
        res.status(404).json({
            success:false, 
            massage:'not found',
        })
    }
}

//get tour by search

export const getToursBySearch = async(req,res) => {
    
    //here 'i' means case sensitive
    const city = new RegExp(req.query.city, 'i')
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)
    
    try {

        //gte means greater than equal
        const tours = await Tour.find({
            city, 
            distance:{$gte:distance}, 
            maxGroupSize:{$gte:maxGroupSize}
        }).populate('reviews')

        res.status(200).json({
            success:true,
            massage:'successful',
            data:tours
        })



    } catch (error) {
        res.status(404).json({
            success:false, 
            massage:'not found',
        })
    }
}

//get featured tour

export const getFeaturedTours = async(req,res) => {
    
    
    try {
        const tours = await Tour.find({featured:true})
        .populate('reviews')
        .limit(8)

        res.status(200).json({
            success:true,
            massage:'successful',
            data:tours
        })



    } catch (error) {
        res.status(404).json({
            success:false, 
            massage:'not found',
        })
    }
}

//get tour count

export const getToursCount = async(req,res) => {
    
    
    try {
        const tourCount = await Tour.estimatedDocumentCount()

        res.status(200).json({
            success:true,
            massage:'successful',
            data:tourCount
        })



    } catch (error) {
        res.status(500).json({
            success:false, 
            massage:'failed to fetch',
        })
    }
}