const Workshop = require('../models/Workshop');


exports.getWorkshops = async (req, res) => {
  try {
    const { maxPrice, freeOnly, location, query } = req.query;
    
    let filter = {};
    
    if (maxPrice) filter.price = { $lte: Number(maxPrice) };
    if (freeOnly === 'true') filter.isFree = true;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }
    
    const workshops = await Workshop.find(filter);
    res.json(workshops);
  } catch (err) {
    res.status(500).json({ 
      status: 'error',
      message: err.message 
    });
  }
};

// إنشاء ورشة جديدة
exports.createWorkshop = async (req, res) => {
  try {
    const workshop = new Workshop(req.body);
    const newWorkshop = await workshop.save();
    
    res.status(201).json({
      status: 'success',
      data: newWorkshop
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.register = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const workshop = await Workshop.findById(id);

    if (!workshop) {
      return res.status(404).json({ message: 'لم يتم العثور على الورشة' });
    }

    // ✅ تحقق من وجود تسجيل مسبق بنفس البريد
    const alreadyRegistered = workshop.registrations.find(
      (r) => r.email === email
    );

    if (alreadyRegistered) {
      return res.status(400).json({ message: 'أنت مسجل مسبقًا في هذه الورشة.' });
    }

    // إذا ما كان مسجل، أضفه
    workshop.registrations.push({ name, email, phone });
    await workshop.save();

    res.status(200).json({ message: 'تم التسجيل بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء التسجيل', error });
  }
};
