/*
    Elopage Webhook

    Those are all available infos:
        HandleElopageRequestTask: order_id 849951

        Es gibt 5 elopage request mit dieser order_id
        Alle von der gleichen Person, aber unterschiedliche Events:
        2019-12-03: chargeback.successful
        29.10.2019: order.subscription.paused
        2019-12-06: payment.successful
        29.10.2019: order.subscription.paying
        2091-12-07: payment.pending


        order_id=849951&order_token=y22MJxHr9XzzPiaaH9GU&payment_session_id=849951&payment_session_token=y22MJxHr9XzzPiaaH9GU&action=payment_processed&initiator&payer[email]=theodora.mis%40gmx.ch&payer[first_name]=Theodora&payer[last_name]=Mis&payer[country]=Schweiz&payer[country_code]=CH&payer[city]=St.+Gallen&payer[street]=Vonwilstrasse+23&payer[street_number]&payer[zip]=9000&payer[company]&payer[vat_no]&payer[phone]&gift_receiver&publisher[id]=691&publisher[email]=joytopia%40gmail.com&publisher[first_name]=Bernd&publisher[last_name]=H%C3%BCckst%C3%A4dt&publisher[street]=Pfarrweg+2&publisher[zip]=74653&publisher[city]=K%C3%BCnzelsau&publisher[country]=Deutschland&publisher[phone]=%2B4979405460810&team_members&product_id=43944&product[id]=43944&product[slug]=gold-de&product[name]=Gold-Mitgliedschaft&product[type]=membership&product[price]=40.0&product[affiliate_program_id]=111&upsell&membership[id]=43944&membership[name]=Gold-Mitgliedschaft&membership[membership_product_1]=Werkzeuge+%26+Ressourcen+%28Gold%29&membership[membership_product_1_id]=44982&membership[membership_product_2]=Zertifizierung+zum%2Fr+Gradido-Botschafter%2Fin&membership[membership_product_2_id]=43970&membership[membership_product_3]=Seminar+3+Nat%C3%BCrliche+%C3%96konomie+des+Lebens&membership[membership_product_3_id]=43969&membership[membership_product_4]=Potential-Entfaltungs-Techniken&membership[membership_product_4_id]=43954&membership[membership_product_5]=Seminar+2+Nat%C3%BCrliche+%C3%96konomie+des+Lebens&membership[membership_product_5_id]=43896&membership[membership_product_6]=Kongresspaket%3A+Gesundes+Geld+f%C3%BCr+eine+gesunde+Welt&membership[membership_product_6_id]=14590&membership[membership_product_7]=Deine+Gold-Mitgliedschaft+bei+Gradido&membership[membership_product_7_id]=43951&membership[membership_product_8]=Gradido+E-Book%2C+H%C3%B6rspiel+%22Joytopia%22++%E2%80%93+und+100+Vorteile&membership[membership_product_8_id]=7312&membership[membership_product_9]=Danke%2C+dass+Du+hilfst+Gradido+in+die+Welt+zu+bringen%21&membership[membership_product_9_id]=43744&membership[membership_product_10]=Basis-Informationen+zu+Gradido&membership[membership_product_10_id]=42600&membership[membership_product_11]=Seminar+1+Nat%C3%BCrliche+%C3%96konomie+des+Lebens&membership[membership_product_11_id]=43882&membership[membership_product_12]=Musical+%22Gradido+%E2%80%93+gemeinsam+retten+wir+die+Welt%22&membership[membership_product_12_id]=43886&membership[membership_product_13]=Premium+Community+%26+Markt&membership[membership_product_13_id]=43885&membership[membership_product_14]=Gradido+Buch+ungek%C3%BCrzte+Version+%26+%C3%9Cbersetzungen&membership[membership_product_14_id]=43887&membership[membership_product_15]=Online-Konferenzen&membership[membership_product_15_id]=43919&membership[membership_product_16]=Gradido+H%C3%B6rbuch&membership[membership_product_16_id]=43920&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&pricing_plan[name]=Monatlich&add_id_1&add_id_2&campaign_id&currency=EUR&coupon_code&recurring=yes&recurring_form=subscription&payment_state=payment_paused&payment_method=sepa&opt_ins&payments_schedule[][rate]=1&payments_schedule[][state]=debt&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.10.2019&payments_schedule[][rate]=2&payments_schedule[][state]=pending&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.11.2019&payments_schedule[][rate]=3&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.12.2019&payments_schedule[][rate]=4&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.01.2020&payments_schedule[][rate]=5&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.02.2020&payments_schedule[][rate]=6&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.03.2020&payments_schedule[][rate]=7&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.04.2020&payments_schedule[][rate]=8&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.05.2020&payments_schedule[][rate]=9&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.06.2020&payments_schedule[][rate]=10&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.07.2020&payments_schedule[][rate]=11&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.08.2020&payments_schedule[][rate]=12&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.09.2020&payments_schedule[][rate]=13&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.10.2020&payments_schedule[][rate]=14&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=0.0&payments_schedule[][date]=29.11.2020&payments_count=0&payments_count_expected&with_test_period=false&with_custom_start=false&created=29.10.2019+13%3A17&id=58268076&invoice_number&revenue=-40.0&amount=-23.72&fee=-16.28&vat_rate=0.0&vat_amount=0.0&state=successful&refunded_transfer_id=52876337&invoice_link&credit_memo_link=http%3A%2F%2Felopage.com%2Fcommon%2Fcredit_memos%2F12410%3Ftoken%3D6dyBsddt6gsJpX8Fq-M2&success_link=http%3A%2F%2Felopage.com%2Fs%2Fgradido%2Fpayment%2Fy22MJxHr9XzzPiaaH9GU&error_msg&created_date=2019-12-03T22%3A15Z&success_date=2019-12-03T22%3A15Z&success_date_short=2019-12-03&created_date_utc=03.12.2019+22%3A15&success_date_utc=03.12.2019+22%3A15&team_member_commissions&event=chargeback.successful
        order_id=849951&order_token=y22MJxHr9XzzPiaaH9GU&payment_session_id=849951&payment_session_token=y22MJxHr9XzzPiaaH9GU&action=subscription_state_changed&initiator&payer[email]=theodora.mis%40gmx.ch&payer[first_name]=Theodora&payer[last_name]=Mis&payer[country]=Schweiz&payer[country_code]=CH&payer[city]=St.+Gallen&payer[street]=Vonwilstrasse+23&payer[street_number]&payer[zip]=9000&payer[company]&payer[vat_no]&payer[phone]&gift_receiver&publisher[id]=691&publisher[email]=joytopia%40gmail.com&publisher[first_name]=Bernd&publisher[last_name]=H%C3%BCckst%C3%A4dt&publisher[street]=Pfarrweg+2&publisher[zip]=74653&publisher[city]=K%C3%BCnzelsau&publisher[country]=Deutschland&publisher[phone]=%2B4979405460810&team_members&product_id=43944&product[id]=43944&product[slug]=gold-de&product[name]=Gold-Mitgliedschaft&product[type]=membership&product[price]=40.0&product[affiliate_program_id]=111&upsell&membership[id]=43944&membership[name]=Gold-Mitgliedschaft&membership[membership_product_1]=Werkzeuge+%26+Ressourcen+%28Gold%29&membership[membership_product_1_id]=44982&membership[membership_product_2]=Zertifizierung+zum%2Fr+Gradido-Botschafter%2Fin&membership[membership_product_2_id]=43970&membership[membership_product_3]=Seminar+3+Nat%C3%BCrliche+%C3%96konomie+des+Lebens&membership[membership_product_3_id]=43969&membership[membership_product_4]=Potential-Entfaltungs-Techniken&membership[membership_product_4_id]=43954&membership[membership_product_5]=Seminar+2+Nat%C3%BCrliche+%C3%96konomie+des+Lebens&membership[membership_product_5_id]=43896&membership[membership_product_6]=Kongresspaket%3A+Gesundes+Geld+f%C3%BCr+eine+gesunde+Welt&membership[membership_product_6_id]=14590&membership[membership_product_7]=Deine+Gold-Mitgliedschaft+bei+Gradido&membership[membership_product_7_id]=43951&membership[membership_product_8]=Gradido+E-Book%2C+H%C3%B6rspiel+%22Joytopia%22++%E2%80%93+und+100+Vorteile&membership[membership_product_8_id]=7312&membership[membership_product_9]=Danke%2C+dass+Du+hilfst+Gradido+in+die+Welt+zu+bringen%21&membership[membership_product_9_id]=43744&membership[membership_product_10]=Basis-Informationen+zu+Gradido&membership[membership_product_10_id]=42600&membership[membership_product_11]=Seminar+1+Nat%C3%BCrliche+%C3%96konomie+des+Lebens&membership[membership_product_11_id]=43882&membership[membership_product_12]=Musical+%22Gradido+%E2%80%93+gemeinsam+retten+wir+die+Welt%22&membership[membership_product_12_id]=43886&membership[membership_product_13]=Premium+Community+%26+Markt&membership[membership_product_13_id]=43885&membership[membership_product_14]=Gradido+Buch+ungek%C3%BCrzte+Version+%26+%C3%9Cbersetzungen&membership[membership_product_14_id]=43887&membership[membership_product_15]=Online-Konferenzen&membership[membership_product_15_id]=43919&membership[membership_product_16]=Gradido+H%C3%B6rbuch&membership[membership_product_16_id]=43920&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&pricing_plan[name]=Monatlich&add_id_1&add_id_2&campaign_id&currency=EUR&coupon_code&recurring=yes&recurring_form=subscription&payment_state=payment_paused&payment_method=sepa&opt_ins&payments_schedule[][rate]=1&payments_schedule[][state]=debt&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.10.2019&payments_schedule[][rate]=2&payments_schedule[][state]=pending&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.11.2019&payments_schedule[][rate]=3&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.12.2019&payments_schedule[][rate]=4&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.01.2020&payments_schedule[][rate]=5&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.02.2020&payments_schedule[][rate]=6&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.03.2020&payments_schedule[][rate]=7&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.04.2020&payments_schedule[][rate]=8&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.05.2020&payments_schedule[][rate]=9&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.06.2020&payments_schedule[][rate]=10&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.07.2020&payments_schedule[][rate]=11&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.08.2020&payments_schedule[][rate]=12&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.09.2020&payments_schedule[][rate]=13&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.10.2020&payments_schedule[][rate]=14&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=0.0&payments_schedule[][date]=29.11.2020&payments_count=0&payments_count_expected&with_test_period=false&with_custom_start=false&created=29.10.2019+13%3A17&event=order.subscription.paused
        order_id=849951&order_token=y22MJxHr9XzzPiaaH9GU&payment_session_id=849951&payment_session_token=y22MJxHr9XzzPiaaH9GU&action=payment_processed&initiator&payer[email]=theodora.mis%40gmx.ch&payer[first_name]=Theodora&payer[last_name]=Mis&payer[country]=Schweiz&payer[country_code]=CH&payer[city]=St.+Gallen&payer[street]=Vonwilstrasse+23&payer[street_number]&payer[zip]=9000&payer[company]&payer[vat_no]&payer[phone]&gift_receiver&publisher[id]=691&publisher[email]=joytopia%40gmail.com&publisher[first_name]=Bernd&publisher[last_name]=H%C3%BCckst%C3%A4dt&publisher[street]=Pfarrweg+2&publisher[zip]=74653&publisher[city]=K%C3%BCnzelsau&publisher[country]=Deutschland&publisher[phone]=%2B4979405460810&team_members&product_id=43944&product[id]=43944&product[slug]=gold-de&product[name]=Gold-Mitgliedschaft&product[type]=membership&product[price]=40.0&product[affiliate_program_id]=111&upsell&membership[id]=43944&membership[name]=Gold-Mitgliedschaft&membership[membership_product_1]=Werkzeuge+%26+Ressourcen+%28Gold%29&membership[membership_product_1_id]=44982&membership[membership_product_2]=Zertifizierung+zum%2Fr+Gradido-Botschafter%2Fin&membership[membership_product_2_id]=43970&membership[membership_product_3]=Seminar+3+Nat%C3%BCrliche+%C3%96konomie+des+Lebens&membership[membership_product_3_id]=43969&membership[membership_product_4]=Potential-Entfaltungs-Techniken&membership[membership_product_4_id]=43954&membership[membership_product_5]=Seminar+2+Nat%C3%BCrliche+%C3%96konomie+des+Lebens&membership[membership_product_5_id]=43896&membership[membership_product_6]=Kongresspaket%3A+Gesundes+Geld+f%C3%BCr+eine+gesunde+Welt&membership[membership_product_6_id]=14590&membership[membership_product_7]=Deine+Gold-Mitgliedschaft+bei+Gradido&membership[membership_product_7_id]=43951&membership[membership_product_8]=Gradido+E-Book%2C+H%C3%B6rspiel+%22Joytopia%22++%E2%80%93+und+100+Vorteile&membership[membership_product_8_id]=7312&membership[membership_product_9]=Danke%2C+dass+Du+hilfst+Gradido+in+die+Welt+zu+bringen%21&membership[membership_product_9_id]=43744&membership[membership_product_10]=Basis-Informationen+zu+Gradido&membership[membership_product_10_id]=42600&membership[membership_product_11]=Seminar+1+Nat%C3%BCrliche+%C3%96konomie+des+Lebens&membership[membership_product_11_id]=43882&membership[membership_product_12]=Musical+%22Gradido+%E2%80%93+gemeinsam+retten+wir+die+Welt%22&membership[membership_product_12_id]=43886&membership[membership_product_13]=Premium+Community+%26+Markt&membership[membership_product_13_id]=43885&membership[membership_product_14]=Gradido+Buch+ungek%C3%BCrzte+Version+%26+%C3%9Cbersetzungen&membership[membership_product_14_id]=43887&membership[membership_product_15]=Online-Konferenzen&membership[membership_product_15_id]=43919&membership[membership_product_16]=Gradido+H%C3%B6rbuch&membership[membership_product_16_id]=43920&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&pricing_plan[name]=Monatlich&add_id_1&add_id_2&campaign_id&currency=EUR&coupon_code&recurring=yes&recurring_form=subscription&payment_state=active_subscription&payment_method=sepa&opt_ins&payments_schedule[][rate]=1&payments_schedule[][state]=debt&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.10.2019&payments_schedule[][rate]=2&payments_schedule[][state]=paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.11.2019&payments_schedule[][rate]=3&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.12.2019&payments_schedule[][rate]=4&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.01.2020&payments_schedule[][rate]=5&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.02.2020&payments_schedule[][rate]=6&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.03.2020&payments_schedule[][rate]=7&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.04.2020&payments_schedule[][rate]=8&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.05.2020&payments_schedule[][rate]=9&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.06.2020&payments_schedule[][rate]=10&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.07.2020&payments_schedule[][rate]=11&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.08.2020&payments_schedule[][rate]=12&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.09.2020&payments_schedule[][rate]=13&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.10.2020&payments_schedule[][rate]=14&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=0.0&payments_schedule[][date]=29.11.2020&payments_schedule[][rate]=15&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=0.0&payments_schedule[][date]=29.12.2020&payments_count=1&payments_count_expected&with_test_period=false&with_custom_start=false&created=29.10.2019+13%3A17&id=57354055&invoice_number=111-1839-000000677&revenue=40.0&amount=23.72&fee=16.28&vat_rate=0.0&vat_amount=0.0&state=successful&refunded_transfer_id&invoice_link=http%3A%2F%2Felopage.com%2Fcommon%2Finvoices%2F450856%2Fdownload.pdf%3Ftoken%3DGR7bG7zcbgCzNJEPLDss&credit_memo_link&success_link=http%3A%2F%2Felopage.com%2Fs%2Fgradido%2Fpayment%2Fy22MJxHr9XzzPiaaH9GU&error_msg&created_date=2019-11-29T07%3A19Z&success_date=2019-12-06T13%3A12Z&success_date_short=2019-12-06&created_date_utc=29.11.2019+07%3A19&success_date_utc=06.12.2019+13%3A12&team_member_commissions&event=payment.successful
        order_id=849951&order_token=y22MJxHr9XzzPiaaH9GU&payment_session_id=849951&payment_session_token=y22MJxHr9XzzPiaaH9GU&action=subscription_state_changed&initiator&payer[email]=theodora.mis%40gmx.ch&payer[first_name]=Theodora&payer[last_name]=Mis&payer[country]=Schweiz&payer[country_code]=CH&payer[city]=St.+Gallen&payer[street]=Vonwilstrasse+23&payer[street_number]&payer[zip]=9000&payer[company]&payer[vat_no]&payer[phone]&gift_receiver&publisher[id]=691&publisher[email]=joytopia%40gmail.com&publisher[first_name]=Bernd&publisher[last_name]=H%C3%BCckst%C3%A4dt&publisher[street]=Pfarrweg+2&publisher[zip]=74653&publisher[city]=K%C3%BCnzelsau&publisher[country]=Deutschland&publisher[phone]=%2B4979405460810&team_members&product_id=43944&product[id]=43944&product[slug]=gold-de&product[name]=Gold-Mitgliedschaft&product[type]=membership&product[price]=40.0&product[affiliate_program_id]=111&upsell&membership[id]=43944&membership[name]=Gold-Mitgliedschaft&membership[membership_product_1]=Werkzeuge+%26+Ressourcen+%28Gold%29&membership[membership_product_1_id]=44982&membership[membership_product_2]=Zertifizierung+zum%2Fr+Gradido-Botschafter%2Fin&membership[membership_product_2_id]=43970&membership[membership_product_3]=Seminar+3+Nat%C3%BCrliche+%C3%96konomie+des+Lebens&membership[membership_product_3_id]=43969&membership[membership_product_4]=Potential-Entfaltungs-Techniken&membership[membership_product_4_id]=43954&membership[membership_product_5]=Seminar+2+Nat%C3%BCrliche+%C3%96konomie+des+Lebens&membership[membership_product_5_id]=43896&membership[membership_product_6]=Kongresspaket%3A+Gesundes+Geld+f%C3%BCr+eine+gesunde+Welt&membership[membership_product_6_id]=14590&membership[membership_product_7]=Deine+Gold-Mitgliedschaft+bei+Gradido&membership[membership_product_7_id]=43951&membership[membership_product_8]=Gradido+E-Book%2C+H%C3%B6rspiel+%22Joytopia%22++%E2%80%93+und+100+Vorteile&membership[membership_product_8_id]=7312&membership[membership_product_9]=Danke%2C+dass+Du+hilfst+Gradido+in+die+Welt+zu+bringen%21&membership[membership_product_9_id]=43744&membership[membership_product_10]=Basis-Informationen+zu+Gradido&membership[membership_product_10_id]=42600&membership[membership_product_11]=Seminar+1+Nat%C3%BCrliche+%C3%96konomie+des+Lebens&membership[membership_product_11_id]=43882&membership[membership_product_12]=Musical+%22Gradido+%E2%80%93+gemeinsam+retten+wir+die+Welt%22&membership[membership_product_12_id]=43886&membership[membership_product_13]=Premium+Community+%26+Markt&membership[membership_product_13_id]=43885&membership[membership_product_14]=Gradido+Buch+ungek%C3%BCrzte+Version+%26+%C3%9Cbersetzungen&membership[membership_product_14_id]=43887&membership[membership_product_15]=Online-Konferenzen&membership[membership_product_15_id]=43919&membership[membership_product_16]=Gradido+H%C3%B6rbuch&membership[membership_product_16_id]=43920&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&pricing_plan[name]=Monatlich&add_id_1&add_id_2&campaign_id&currency=EUR&coupon_code&recurring=yes&recurring_form=subscription&payment_state=active_subscription&payment_method=sepa&opt_ins&payments_schedule[][rate]=1&payments_schedule[][state]=debt&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.10.2019&payments_schedule[][rate]=2&payments_schedule[][state]=paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.11.2019&payments_schedule[][rate]=3&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.12.2019&payments_schedule[][rate]=4&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.01.2020&payments_schedule[][rate]=5&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.02.2020&payments_schedule[][rate]=6&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.03.2020&payments_schedule[][rate]=7&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.04.2020&payments_schedule[][rate]=8&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.05.2020&payments_schedule[][rate]=9&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.06.2020&payments_schedule[][rate]=10&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.07.2020&payments_schedule[][rate]=11&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.08.2020&payments_schedule[][rate]=12&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.09.2020&payments_schedule[][rate]=13&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.10.2020&payments_schedule[][rate]=14&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=0.0&payments_schedule[][date]=29.11.2020&payments_schedule[][rate]=15&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=0.0&payments_schedule[][date]=29.12.2020&payments_count=1&payments_count_expected&with_test_period=false&with_custom_start=false&created=29.10.2019+13%3A17&event=order.subscription.paying
        order_id=849951&order_token=y22MJxHr9XzzPiaaH9GU&payment_session_id=849951&payment_session_token=y22MJxHr9XzzPiaaH9GU&action=payment_processed&initiator&payer[email]=theodora.mis%40gmx.ch&payer[first_name]=Theodora&payer[last_name]=Mis&payer[country]=Schweiz&payer[country_code]=CH&payer[city]=St.+Gallen&payer[street]=Vonwilstrasse+23&payer[street_number]&payer[zip]=9000&payer[company]&payer[vat_no]&payer[phone]&gift_receiver&publisher[id]=691&publisher[email]=joytopia%40gmail.com&publisher[first_name]=Bernd&publisher[last_name]=H%C3%BCckst%C3%A4dt&publisher[street]=Pfarrweg+2&publisher[zip]=74653&publisher[city]=K%C3%BCnzelsau&publisher[country]=Deutschland&publisher[phone]=%2B4979405460810&team_members&product_id=43944&product[id]=43944&product[slug]=gold-de&product[name]=Gold-Mitgliedschaft&product[type]=membership&product[price]=40.0&product[affiliate_program_id]=111&upsell&membership[id]=43944&membership[name]=Gold-Mitgliedschaft&membership[membership_product_1]=Werkzeuge+%26+Ressourcen+%28Gold%29&membership[membership_product_1_id]=44982&membership[membership_product_2]=Zertifizierung+zum%2Fr+Gradido-Botschafter%2Fin&membership[membership_product_2_id]=43970&membership[membership_product_3]=Seminar+3+Nat%C3%BCrliche+%C3%96konomie+des+Lebens&membership[membership_product_3_id]=43969&membership[membership_product_4]=Potential-Entfaltungs-Techniken&membership[membership_product_4_id]=43954&membership[membership_product_5]=Seminar+2+Nat%C3%BCrliche+%C3%96konomie+des+Lebens&membership[membership_product_5_id]=43896&membership[membership_product_6]=Kongresspaket%3A+Gesundes+Geld+f%C3%BCr+eine+gesunde+Welt&membership[membership_product_6_id]=14590&membership[membership_product_7]=Deine+Gold-Mitgliedschaft+bei+Gradido&membership[membership_product_7_id]=43951&membership[membership_product_8]=Gradido+E-Book%2C+H%C3%B6rspiel+%22Joytopia%22++%E2%80%93+und+100+Vorteile&membership[membership_product_8_id]=7312&membership[membership_product_9]=Danke%2C+dass+Du+hilfst+Gradido+in+die+Welt+zu+bringen%21&membership[membership_product_9_id]=43744&membership[membership_product_10]=Basis-Informationen+zu+Gradido&membership[membership_product_10_id]=42600&membership[membership_product_11]=Seminar+1+Nat%C3%BCrliche+%C3%96konomie+des+Lebens&membership[membership_product_11_id]=43882&membership[membership_product_12]=Musical+%22Gradido+%E2%80%93+gemeinsam+retten+wir+die+Welt%22&membership[membership_product_12_id]=43886&membership[membership_product_13]=Premium+Community+%26+Markt&membership[membership_product_13_id]=43885&membership[membership_product_14]=Gradido+Buch+ungek%C3%BCrzte+Version+%26+%C3%9Cbersetzungen&membership[membership_product_14_id]=43887&membership[membership_product_15]=Online-Konferenzen&membership[membership_product_15_id]=43919&membership[membership_product_16]=Gradido+H%C3%B6rbuch&membership[membership_product_16_id]=43920&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&events[]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&tickets[][codes]&tickets[][ticket_attendees]&pricing_plan[name]=Monatlich&add_id_1&add_id_2&campaign_id&currency=EUR&coupon_code&recurring=yes&recurring_form=subscription&payment_state=active_subscription&payment_method=sepa&opt_ins&payments_schedule[][rate]=1&payments_schedule[][state]=pending&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.10.2019&payments_schedule[][rate]=2&payments_schedule[][state]=paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.11.2019&payments_schedule[][rate]=3&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.12.2019&payments_schedule[][rate]=4&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.01.2020&payments_schedule[][rate]=5&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.02.2020&payments_schedule[][rate]=6&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.03.2020&payments_schedule[][rate]=7&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.04.2020&payments_schedule[][rate]=8&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.05.2020&payments_schedule[][rate]=9&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.06.2020&payments_schedule[][rate]=10&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.07.2020&payments_schedule[][rate]=11&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.08.2020&payments_schedule[][rate]=12&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.09.2020&payments_schedule[][rate]=13&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=40.0&payments_schedule[][date]=29.10.2020&payments_schedule[][rate]=14&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=0.0&payments_schedule[][date]=29.11.2020&payments_schedule[][rate]=15&payments_schedule[][state]=to_be_paid&payments_schedule[][amount]=0.0&payments_schedule[][date]=29.12.2020&payments_count=1&payments_count_expected&with_test_period=false&with_custom_start=false&created=29.10.2019+13%3A17&id=58838098&invoice_number=111-1839-000000689&revenue=40.0&amount=23.72&fee=16.28&vat_rate=0.0&vat_amount=0.0&state=pending&refunded_transfer_id&invoice_link=http%3A%2F%2Felopage.com%2Fcommon%2Finvoices%2F470009%2Fdownload.pdf%3Ftoken%3DZ_gogUf8tpKxcHhB-7Cz&credit_memo_link&success_link=http%3A%2F%2Felopage.com%2Fs%2Fgradido%2Fpayment%2Fy22MJxHr9XzzPiaaH9GU&error_msg&created_date=2019-12-07T07%3A19Z&success_date&success_date_short&created_date_utc=07.12.2019+07%3A19&success_date_utc&team_member_commissions&event=payment.pending

    Additional we have the Elopage API docu:
        https://apidoc.elopage.com/#webhooks

    I assume that the webhook arrives via POST and transmits a string as shown above
*/

import { LoginElopageBuys } from '@entity/LoginElopageBuys'
import { LoginUser } from '@entity/LoginUser'
import { randomBytes } from 'crypto'
import { UserResolver } from '../graphql/resolver/UserResolver'

export const elopageWebhook = async (req: any, res: any): Promise<void> => {
  res.status(200).end() // Responding is important

  const loginElopgaeBuy = new LoginElopageBuys()
  let firstName = ''
  let lastName = ''
  const entries = req.body.split('&')
  entries.map((entry: string) => {
    const keyVal = entry.split('=')
    if (keyVal.length !== 2) {
      throw new Error(`Error parsing entry '${entry}'`)
    }
    const key = keyVal[0]
    const val = decodeURIComponent(keyVal[1]).replace('+', ' ').trim()
    switch (key) {
      case 'product[affiliate_program_id]':
        loginElopgaeBuy.affiliateProgramId = parseInt(val)
        break
      case 'publisher[id]':
        loginElopgaeBuy.publisherId = parseInt(val)
        break
      case 'order_id':
        loginElopgaeBuy.orderId = parseInt(val)
        break
      case 'product_id':
        loginElopgaeBuy.productId = parseInt(val)
        break
      case 'product[price]':
        // TODO: static_cast<Poco::Int32>(round(stof(temp) * 100.0f));
        loginElopgaeBuy.productPrice = parseFloat(val)
        break
      case 'payer[email]':
        loginElopgaeBuy.payerEmail = val
        break
      case 'publisher[email]':
        loginElopgaeBuy.publisherEmail = val
        break
      case 'payment_state':
        loginElopgaeBuy.payed = val === 'paid'
        break
      case 'success_date':
        loginElopgaeBuy.successDate = new Date(val)
        break
      case 'event':
        loginElopgaeBuy.event = val
        break
      case 'membership[id]':
        // TODO this was never set on login_server - its unclear if this is the correct value
        loginElopgaeBuy.elopageUserId = parseInt(val)
        break
      case 'payer[first_name]':
        firstName = val
        break
      case 'payer[last_name]':
        lastName = val
        break
      default:
        // eslint-disable-next-line no-console
        console.log(`Unknown Elopage Value '${entry}'`)
    }
    return null // we write things into the loginElopgaeBuy object, no return value needed
  })

  // Do not process certain events
  if (['lesson.viewed', 'lesson.completed', 'lesson.commented'].includes(loginElopgaeBuy.event)) {
    // eslint-disable-next-line no-console
    console.log('User viewed, completed or commented - not saving hook')
    return
  }

  // Save the hook data
  await loginElopgaeBuy.save()

  // create user for certain products
  /*
    Registrierung - Schritt 1 von 3,  36001
    Gradido-Basis,                    43741
    Premium-Mitgliedschaft,           43870
    Gold-Mitgliedschaft,              43944
    Business-Mitgliedschaft,          43960
    Förderbeitrag:                    49106
  */
  if ([36001, 43741, 43870, 43944, 43960, 49106].includes(loginElopgaeBuy.productId)) {
    const email = loginElopgaeBuy.payerEmail

    const VALIDATE_EMAIL = /^[a-zA-Z0-9.!#$%&?*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const VALIDATE_NAME = /^<>&;]{2,}$/

    // Validate inputs
    if (
      email === '' ||
      !email.match(VALIDATE_EMAIL) ||
      firstName === '' ||
      firstName.match(VALIDATE_NAME) ||
      lastName === '' ||
      lastName.match(VALIDATE_NAME)
    ) {
      // eslint-disable-next-line no-console
      console.log(`Could not create User ${firstName} ${lastName} with email: ${email}`)
      return
    }

    // Do we already have such a user?
    if ((await LoginUser.count({ email })) !== 0) {
      // eslint-disable-next-line no-console
      console.log(`Did not create User - already exists with email: ${email}`)
      return
    }

    // generate a random password - 8 random bytes, the email, special char, capital & small letter, number and another set of 8 random bytes
    // TODO: The user will be forced to reset his password - how was this done before?
    const password =
      randomBytes(8).toString('hex') + email + '!aA1' + randomBytes(8).toString('hex')

    const userResolver = new UserResolver()
    try {
      await userResolver.createUser({
        email,
        firstName,
        lastName,
        password,
        language: 'default',
        publisherId: loginElopgaeBuy.publisherId,
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`Could not create User for ${email}. Following Error occured:`, error)
    }
  }
}

/*
Known unused fields:

    order_token=y22MJxHr9XzzPiaaH9GU
    payment_session_id=849951
    payment_session_token=y22MJxHr9XzzPiaaH9GU
    action=payment_processed
    initiator
    payer[first_name]=Theodora
    payer[last_name]=Mis
    payer[country]=Schweiz
    payer[country_code]=CH
    payer[city]=St.+Gallen
    payer[street]=Vonwilstrasse+23
    payer[street_number]
    payer[zip]=9000
    payer[company]
    payer[vat_no]
    payer[phone]
    gift_receiver
    publisher[first_name]=Bernd
    publisher[last_name]=H%C3%BCckst%C3%A4dt
    publisher[street]=Pfarrweg+2
    publisher[zip]=74653
    publisher[city]=K%C3%BCnzelsau
    publisher[country]=Deutschland
    publisher[phone]=%2B4979405460810
    team_members
    product[id]=43944
    product[slug]=gold-de
    product[name]=Gold-Mitgliedschaft
    product[type]=membership
    upsell
    membership[name]=Gold-Mitgliedschaft
    membership[membership_product_1]=Werkzeuge+%26+Ressourcen+%28Gold%29
    membership[membership_product_1_id]=44982
    membership[membership_product_2]=Zertifizierung+zum%2Fr+Gradido-Botschafter%2Fin
    membership[membership_product_2_id]=43970
    membership[membership_product_3]=Seminar+3+Nat%C3%BCrliche+%C3%96konomie+des+Lebens
    membership[membership_product_3_id]=43969
    membership[membership_product_4]=Potential-Entfaltungs-Techniken
    membership[membership_product_4_id]=43954
    membership[membership_product_5]=Seminar+2+Nat%C3%BCrliche+%C3%96konomie+des+Lebens
    membership[membership_product_5_id]=43896
    membership[membership_product_6]=Kongresspaket%3A+Gesundes+Geld+f%C3%BCr+eine+gesunde+Welt
    membership[membership_product_6_id]=14590
    membership[membership_product_7]=Deine+Gold-Mitgliedschaft+bei+Gradido
    membership[membership_product_7_id]=43951
    membership[membership_product_8]=Gradido+E-Book%2C+H%C3%B6rspiel+%22Joytopia%22++%E2%80%93+und+100+Vorteile
    membership[membership_product_8_id]=7312
    membership[membership_product_9]=Danke%2C+dass+Du+hilfst+Gradido+in+die+Welt+zu+bringen%21
    membership[membership_product_9_id]=43744
    membership[membership_product_10]=Basis-Informationen+zu+Gradido
    membership[membership_product_10_id]=42600
    membership[membership_product_11]=Seminar+1+Nat%C3%BCrliche+%C3%96konomie+des+Lebens
    membership[membership_product_11_id]=43882
    membership[membership_product_12]=Musical+%22Gradido+%E2%80%93+gemeinsam+retten+wir+die+Welt%22
    membership[membership_product_12_id]=43886
    membership[membership_product_13]=Premium+Community+%26+Markt
    membership[membership_product_13_id]=43885
    membership[membership_product_14]=Gradido+Buch+ungek%C3%BCrzte+Version+%26+%C3%9Cbersetzungen
    membership[membership_product_14_id]=43887
    membership[membership_product_15]=Online-Konferenzen
    membership[membership_product_15_id]=43919
    membership[membership_product_16]=Gradido+H%C3%B6rbuch
    membership[membership_product_16_id]=43920
    events[]
    events[]
    events[]
    events[]
    events[]
    events[]
    events[]
    events[]
    events[]
    events[]
    events[]
    events[]
    events[]
    events[]
    events[]
    events[]
    tickets[][codes]
    tickets[][ticket_attendees]
    tickets[][codes]
    tickets[][ticket_attendees]
    tickets[][codes]
    tickets[][ticket_attendees]
    tickets[][codes]
    tickets[][ticket_attendees]
    tickets[][codes]
    tickets[][ticket_attendees]
    tickets[][codes]
    tickets[][ticket_attendees]
    tickets[][codes]
    tickets[][ticket_attendees]
    tickets[][codes]
    tickets[][ticket_attendees]
    tickets[][codes]
    tickets[][ticket_attendees]
    tickets[][codes]
    tickets[][ticket_attendees]
    tickets[][codes]
    tickets[][ticket_attendees]
    tickets[][codes]
    tickets[][ticket_attendees]
    tickets[][codes]
    tickets[][ticket_attendees]
    tickets[][codes]
    tickets[][ticket_attendees]
    tickets[][codes]
    tickets[][ticket_attendees]
    tickets[][codes]
    tickets[][ticket_attendees]
    pricing_plan[name]=Monatlich
    add_id_1
    add_id_2
    campaign_id
    currency=EUR
    coupon_code
    recurring=yes
    recurring_form=subscription
    payment_method=sepa
    opt_ins
    payments_schedule[][rate]=1
    payments_schedule[][state]=debt
    payments_schedule[][amount]=40.0
    payments_schedule[][date]=29.10.2019
    payments_schedule[][rate]=2
    payments_schedule[][state]=paid
    payments_schedule[][amount]=40.0
    payments_schedule[][date]=29.11.2019
    payments_schedule[][rate]=3
    payments_schedule[][state]=to_be_paid
    payments_schedule[][amount]=40.0
    payments_schedule[][date]=29.12.2019
    payments_schedule[][rate]=4
    payments_schedule[][state]=to_be_paid
    payments_schedule[][amount]=40.0
    payments_schedule[][date]=29.01.2020
    payments_schedule[][rate]=5
    payments_schedule[][state]=to_be_paid
    payments_schedule[][amount]=40.0
    payments_schedule[][date]=29.02.2020
    payments_schedule[][rate]=6
    payments_schedule[][state]=to_be_paid
    payments_schedule[][amount]=40.0
    payments_schedule[][date]=29.03.2020
    payments_schedule[][rate]=7
    payments_schedule[][state]=to_be_paid
    payments_schedule[][amount]=40.0
    payments_schedule[][date]=29.04.2020
    payments_schedule[][rate]=8
    payments_schedule[][state]=to_be_paid
    payments_schedule[][amount]=40.0
    payments_schedule[][date]=29.05.2020
    payments_schedule[][rate]=9
    payments_schedule[][state]=to_be_paid
    payments_schedule[][amount]=40.0
    payments_schedule[][date]=29.06.2020
    payments_schedule[][rate]=10
    payments_schedule[][state]=to_be_paid
    payments_schedule[][amount]=40.0
    payments_schedule[][date]=29.07.2020
    payments_schedule[][rate]=11
    payments_schedule[][state]=to_be_paid
    payments_schedule[][amount]=40.0
    payments_schedule[][date]=29.08.2020
    payments_schedule[][rate]=12
    payments_schedule[][state]=to_be_paid
    payments_schedule[][amount]=40.0
    payments_schedule[][date]=29.09.2020
    payments_schedule[][rate]=13
    payments_schedule[][state]=to_be_paid
    payments_schedule[][amount]=40.0
    payments_schedule[][date]=29.10.2020
    payments_schedule[][rate]=14
    payments_schedule[][state]=to_be_paid
    payments_schedule[][amount]=0.0
    payments_schedule[][date]=29.11.2020
    payments_schedule[][rate]=15
    payments_schedule[][state]=to_be_paid
    payments_schedule[][amount]=0.0
    payments_schedule[][date]=29.12.2020
    payments_count=1&payments_count_expected
    with_test_period=false
    with_custom_start=false
    created=29.10.2019+13%3A17
    id=57354055
    invoice_number=111-1839-000000677
    revenue=40.0
    amount=23.72
    fee=16.28
    vat_rate=0.0
    vat_amount=0.0
    state=successful
    refunded_transfer_id
    invoice_link=http%3A%2F%2Felopage.com%2Fcommon%2Finvoices%2F450856%2Fdownload.pdf%3Ftoken%3DGR7bG7zcbgCzNJEPLDss
    credit_memo_link
    success_link=http%3A%2F%2Felopage.com%2Fs%2Fgradido%2Fpayment%2Fy22MJxHr9XzzPiaaH9GU
    error_msg
    created_date=2019-11-29T07%3A19Z
    success_date_short=2019-12-06
    created_date_utc=29.11.2019+07%3A19
    success_date_utc=06.12.2019+13%3A12
    team_member_commissions
*/
