let logo_Name = window.location.hash.substring(1)
let logo_Image = document.querySelector("#logo");
if (logo_Name === "Starbucks") logo_Image.src = "../logos/starbucks.png";
else if (logo_Name === "Mikel") logo_Image.src = "../logos/mikel.jpg";
else if (logo_Name === "CoffeeIsland") logo_Image.src = "../logos/coffeeisland.jpg";


// Get the modal
let Menu_Modal = '';
let Menu_Item = '';
let Item_Price = '';

document.querySelectorAll(".menu-item").forEach((div) => {
  let item_Selected = div.textContent;
  let index = item_Selected.indexOf('Από');
  item_Selected = item_Selected.substring(0, index).trim();
  let price = (div.outerHTML).replace(/^\D+/g, '');

  let modal = div.attributes[1].nodeValue;

  div.addEventListener('click', () => {
    Menu_Item = item_Selected;
    Item_Price = price.replace("</div>", "");
    if (modal.indexOf('coffee') !== -1) Menu_Modal = document.querySelector("#cafe_modal");
    else if (modal.indexOf('refresh') !== -1) Menu_Modal = document.querySelector("#refreshment_modal");
    else if (modal.indexOf('sandwich') !== -1) Menu_Modal = document.querySelector("#sandwich_modal");
    ResetCategoryButtons();
    Menu_Modal.style.display = "block";
  });
});

//  <Close Modal functions>

window.onclick = function (event) {
  if (event.target == Menu_Modal) {
    Menu_Modal.style.display = "none";
    document.querySelector('#comments').value = "";
    ResetButtons();
  }
}

document.querySelectorAll('#CloseModal').forEach(button => {
  button.addEventListener('click', () => {
    Menu_Modal.style.display = "none";
    document.querySelector('#comments').value = "";
  })
});

//  </Close Modal functions>

let sugar_type = "",
  sugar_amount = "";

let size = "",
  size_cost = 0.00,
  extras = "",
  extras_cost = 0.00;

let cart = [];

document.querySelectorAll('.extras-option').forEach((div) => {
  let Div_Selected = div;
  Div_Selected.style.backgroundColor = "white";
  Div_Selected.style.color = "black";
  div.addEventListener('click', () => {
    if (Div_Selected.parentElement.parentElement.id === 'sugar_type' && Div_Selected.style.color === "black") {
      ResetCategoryButtons('sugar_type');
      sugar_type = Div_Selected.textContent;
    } else if (Div_Selected.parentElement.parentElement.id === 'sugar_amount' && Div_Selected.style.color === "black") {
      ResetCategoryButtons('sugar_amount');
      sugar_amount = Div_Selected.textContent;
    } else if (Div_Selected.parentElement.parentElement.id === 'size' && Div_Selected.style.color === "black") {
      ResetCategoryButtons('size');
      size = Div_Selected.textContent;
      if (size === 'Μονός') size_cost = 0.00;
      else size_cost = 0.20;
    }
    Calculate_Extras(Div_Selected);

    if (Div_Selected.style.backgroundColor === "white") Div_Selected.style.backgroundColor = "#537791";
    else Div_Selected.style.backgroundColor = "white";

    if (Div_Selected.style.color === "black") Div_Selected.style.color = "#F7F6E7";
    else Div_Selected.style.color = "black";
  })

});

document.querySelectorAll('#ConfirmModal').forEach(button => {
  button.addEventListener('click', () => {
    if ((size === "" || sugar_amount === "" || sugar_type === "") &&
      (Menu_Modal.id.indexOf('cafe') !== -1)) {
      val = document.querySelector('#comments').value;
      document.querySelector('#comments').style.color = "red";
      document.querySelector('#comments').value += "Επιλέξτε είδος,ποσότητα ζάχαρης και μέγεθος.";
      setTimeout(() => {
        document.querySelector('#comments').style.color = "black";
        document.querySelector('#comments').value = val;
      }, 1500);
    } else if (Menu_Modal.id.indexOf('cafe') !== -1) {
      cart.push(["Coffee", ProduceId(), Menu_Item, Item_Price.replace('\n', "").trimEnd(), extras_cost.toPrecision(2), size_cost.toPrecision(2),
        sugar_type, sugar_amount, size, extras, document.querySelector('#comments').value
      ]);
      ClearVariables();
      Menu_Modal.style.display = "none";
    } else if (Menu_Modal.id.indexOf('refreshment') !== -1) {
      cart.push(["Refreshment", ProduceId(), Menu_Item, Item_Price.replace('\n', "").trimEnd(), extras_cost.toPrecision(2), extras,
        document.querySelector('#comments').value
      ]);
      ClearVariables();
      Menu_Modal.style.display = "none";
    } else if (Menu_Modal.id.indexOf('sandwich') !== -1) {
      cart.push(["Sandwich", ProduceId(), Menu_Item, Item_Price.replace('\n', "").trimEnd(), document.querySelector('#comments').value]);
      ClearVariables();
      Menu_Modal.style.display = "none";
    }
  });
});

let tabs = Array.from(document.querySelector('#tabs').getElementsByTagName('li'));
let menu = document.querySelector('main').innerHTML;

let desc = "";
if (logo_Name === "Starbucks") {
  desc = "<h1>Πληροφορίες Καταστήματος</h1><br>";
  desc += "<p>Δεν είναι μόνο η καφεΐνη. Όλα τα προϊόντα των Starbucks παρασκευάζονται από απαράμιλλης ποιότητας συστατικά.";
  desc += "Θέλεις να μάθεις πόση καφεΐνη έχει ο cappuccino σου, ή τις πρωτεΐνες που περιλαμβάνονται στο προϊόν φαγητού που επέλεξες;";
  desc += "Εδώ θα βρεις πληροφορίες σχετικά με την διατροφική αξία των προϊόντων φαγητού και ροφημάτων των Starbucks που διαθέτουμε,";
  desc += "ώστε να γνωρίζεις ακριβώς το διατροφικό προφίλ των αγαπημένων σου επιλογών.</p>";

} else if (logo_Name === "Mikel") {
  desc = "<h1>Πληροφορίες Καταστήματος</h1><br>";
  desc += "<p>Ωπ! Τι κάνεις εδώ; Μάλλον ψήθηκες για καφέ, ε; Τότε πολύ σωστά επέλεξες τα MIKEL για delivery. Ένα δίκτυο που ξεκίνησε από τη Λάρισα";
  desc += "και σήμερα διαθέτει πάνω από 100 καταστήματα σε όλη την Ελλάδα, εκ των οποίων περισσότερα από 50 εξυπηρετούν και τους χρήστες του efood.";
  desc += "Η επιλογή του καφέ, το μοναδικό χαρμάνι, οι σπιτικές αναμνήσεις που ξυπνούν τα βουτήματα και τα αρτοσκευάσματα που προσφέρονται";
  desc += "καθημερινά αποτελούν την εγγύηση μιας εξαιρετικής εμπειρίας. Κι ενώ η ποιότητα καφέ και οι τιμές είναι δύο λόγοι για να προτιμήσεις";
  desc += "την εν λόγω επιχείρηση, εμείς θα σταθούμε λίγο παραπάνω και στο menu τους, αφού στα MIKEL μπορείς να βρεις το ρόφημα που ξέρεις ότι";
  desc += "θα απολαύσεις, αλλά και κάτι αλμυρό ή γλυκό για να το συνοδεύσεις. Τι θα ήθελες; Έναν κρύο ή έναν ζεστό καφέ; Το Cappuccino Affogato";
  desc += "Cold, το Espresso Cafe Au Lait, το Espresso Latte Macchiato και το Cappuccino Mikelo Cold σίγουρα κλέβουν την παράσταση στο κεφάλαιο";
  desc += "καφέ, ενώ αν είσαι πιο θαρραλέος μπορείς να δοκιμάσεις το Chocolate Coffee και το Mikelochino με espresso και παγωτό. Εάν πάλι δεν";
  desc += "είσαι και μεγάλος fan του καφέ μπορείς να διαλέξεις ανάμεσα σε διαφορετικές σοκολάτες, τσάι αλλά και γάλα με γεύσεις φουντούκι,";
  desc += "φράουλα και καραμέλα. Τέλος, αφού πάντα θέλεις τον καφέ σου να τον συνδυάζεις με κάτι, ρίξε μια ματιά στα τοστ, τις σαλάτες και τις";
  desc += "μπαγκέτες, ενώ πριν κάνεις την παραγγελία σου, μην ξεχάσεις να προσθέσεις στο καλάθι σου και το αγαπημένο σου γλυκό. Αν σε όλα αυτά";
  desc += "προσθέσεις την ευκολία και την ταχύτητα παραγγελίας που σου εξασφαλίζει το efood τότε το πακέτο ολοκληρώνεται Τι περιμένεις; Ακόμα να";
  desc += "παραγγείλεις;</p>";
} else if (logo_Name === "CoffeeIsland") {
  desc = "<h1>Πληροφορίες Καταστήματος</h1><br>";
  desc += "<p>Το μαγικό ταξίδι του Coffee Island ξεκίνησε το 1999 στο κέντρο της Πάτρας, όπου άνοιξε το πρώτο κατάστημα. Ένα παραδοσιακό καφεκοπτείο";
  desc += "με μοντέρνα οπτική που σε συνδυασμό με την αγάπη και το πάθος για τον καφέ των ανθρώπων που κρύβονται πίσω από όλα αυτά, έγινε η αιτία που";
  desc += "όχι μόνο μπορείς να πιείς τον αγαπημένο σου καφέ σχεδόν σε όλη την Ελλάδα, αλλά το πιο σημαντικό που όταν θες καφέ η πρώτη σου σκέψη είναι";
  desc += "Coffee Island! Στα Coffee Island σου υποσχόμαστε ότι αυτή η στιγμή της πρώτης γουλιάς θα γίνει η αγαπημένη σου στιγμή μέσα στην μέρα,";
  desc += "διαλέγοντας μέσα από την καλύτερη ομάδα μονοποικιλιών Arabica. Αλλά ακόμα και τις στιγμές που θες αυτό το κάτι άλλο πέραν του καφέ τα Coffee";
  desc += "Island είναι δίπλα σου με λαχταριστά ροφήματα σοκολάτας και μεγάλη ποικιλία από βότανα όπως τσάι, φασκόμηλο ή λεβάντα και άλλα που";
  desc += "συλλέγονται με το χέρι από ντόπιους παραγωγούς αποκλειστικά για τα Coffee Island. Φυσικά όλα αυτά μπορείς να τα συνοδεύσεις με μια";
  desc += "ολόφρεσκη αραβική κοτόπουλο και τσένταρ ή ένα τρίγωνο με καπνιστό σολωμό και τυρί κρέμα, ή ακόμα καλύτερα με μια γλυκιά απόλαυση από";
  desc += "χειροποίητα εξαιρετικής ποιότητας κουλουράκια με κανέλα ή λεμόνι. Αν σε όλα αυτά προσθέσεις την ευκολία και την ταχύτητα παραγγελίας";
  desc += "που σου εξασφαλίζει το efood τότε το πακέτο ολοκληρώνεται. Τι περιμένεις; Ακόμα να παραγγείλεις Coffee Island;";
}

let stores = "<h1>Καταστήματα</h1><br><ul>";
stores += "<li><h4>Λεωφόρος Κηφισίας 92</h4></li>";
stores += "<li>Σταθερό τηλέφωνο: 21021549856</li>";
stores += "<li>Κινητό τηλέφωνο: 6945879856</li>";
stores += "<li><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></li>"
stores += "<li><h4>Λεωφόρος Κηφισίας 90</h4></li>";
stores += "<li>Σταθερό τηλέφωνο: 21023654898</li>";
stores += "<li>Κινητό τηλέφωνο: 6935214569</li>";
stores += "<li><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span></li>"
stores += "<li><h4>Λεωφόρος Κηφισίας 89</h4></li>";
stores += "<li>Σταθερό τηλέφωνο: 21023654887</li>";
stores += "<li>Κινητό τηλέφωνο: 6978541202</li>";
stores += "<li><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star'></span></li>"
stores += "<li><h4>Λεωφόρος Κηφισίας 78</h4></li>";
stores += "<li>Σταθερό τηλέφωνο: 21032651545</li>";
stores += "<li>Κινητό τηλέφωνο: 6951548789</li>";
stores += "<li><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star'></span></li>"
stores += "<li><h4>Λεωφόρος Κηφισίας 70</h4></li>";
stores += "<li>Σταθερό τηλέφωνο: 21028514535</li>";
stores += "<li>Κινητό τηλέφωνο: 6975453202</li>";
stores += "<li><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></li>"

let show_cart = "";



tabs.forEach(li => {
  li.addEventListener('click', () => {
    tabs.forEach(li => {
      li.classList.remove('active');
    });
    li.classList.add('active');
    if (li.textContent === 'Πληροφορίες Καταστήματος') {
      document.querySelector('.information').innerHTML = desc;
      document.querySelector('.information').style.display = 'block';
      document.querySelector('.ShowItems').style.display = 'none';
    } else if (li.textContent === 'Μενού') {
      document.querySelector('.information').innerHTML = "";
      document.querySelector('.ShowItems').style.display = 'grid';
      document.querySelector('.information').style.display = 'none';
      // location.href = 'order.html';
    } else if (li.textContent === 'Καταστήματα') {
      document.querySelector('.information').innerHTML = stores;
      document.querySelector('.information').style.display = 'block';
      document.querySelector('.ShowItems').style.display = 'none';
    } else if (li.textContent === 'Καλάθι') {
      document.querySelector('.information').innerHTML = "";
      GenerateCart();
      document.querySelector('.information').style.display = 'block';
      document.querySelector('.ShowItems').style.display = 'none';
    }
  });
});

function Confirm_Order(){
  location.href = '../html/payment.html';
  localStorage.setItem("cart", JSON.stringify(cart));
}