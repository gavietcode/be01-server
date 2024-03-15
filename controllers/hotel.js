import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const saveHotel = await newHotel.save();
    res.status(200).json(saveHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted!.");
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getAllHotels = async (req, res, next) => {
  // // Check error when id not match or not found
  // const failed = true;
  // // const err = new Error();
  // // err.status = 404;
  // // err.message = "Sorry not found!.";
  // if (failed) {
  //   return next(createError(401, "You are not authenticated!."));
  // }

  const { min, max, ...others } = req.query;

  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    }).limit(req.query.Limit);
    // const hotels = await Hotel.findById("dfasdfasdf"); // check error when id not match

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        // return Hotel.find({ city: city }).length;
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentsCount = await Hotel.countDocuments({ type: "apartments" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentsCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );

    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const getHotelSearch = async (req, res, next) => {
  function titleLowerCase(str) {
    return str.toLowerCase().replace(/(^|\s)S/g, function (l) {
      return l.toUpperCase();
    });
  }
  const getDatesRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const { min, max, maxPeople, room, city, startDate, endDate } = req.query;
  console.log("req.query", req.query);
  const cityLowerCase = titleLowerCase(city);
  const startDates = new Date(startDate);
  const endDates = new Date(endDate);
  const allDates = getDatesRange(startDate, endDate);

  try {
    const roomIsAvailable = [];
    const rooms = Room.find({ maxPeople: { $gte: Number(maxPeople) } });
    rooms.map((room) => {
      room.roomNumbers.map((item) => {
        const checkRooms = item.unavailableDates.some((date) =>
          allDates.includes(new Date(date).getTime())
        );
        if (!checkRooms) {
          roomIsAvailable.push(room);
        }
      });
    });

    const roomsId = roomIsAvailable.map((room) => room._id.toString());

    const hotels = await Hotel.find({
      city: cityLowerCase,
      rooms: {
        $in: roomsId,
      },
      cheapestPrice: { $gt: min | 1, $lt: max | 999 },
    });

    const listHotels = hotels.filter(
      (hotel) => hotel.rooms.length >= Number(room)
    );

    res.status(200).json(listHotels);
  } catch (err) {
    next(err);
  }
};
